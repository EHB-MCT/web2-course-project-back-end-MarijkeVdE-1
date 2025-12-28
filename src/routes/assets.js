const router = require("express").Router();
const upload = require("../middleware/upload");
const Asset = require("../models/asset");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// --- simpele auth middleware (token in Authorization: Bearer <token>)
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret_change_me"
    );
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

/**
 * GET /api/assets
 * Lijst alle assets (voor Assignment page)
 */
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 });
    res.json(assets);
  } catch (err) {
    console.error("ASSET LIST ERROR:", err);
    res.status(500).json({ message: "Failed to load assets." });
  }
});

/**
 * POST /api/assets/upload
 * Upload asset (image/mp4/pdf/...)
 */
router.post(
  "/upload",
  requireAuth,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const main = req.files?.file?.[0];
      const preview = req.files?.preview?.[0];

      if (!main) return res.status(400).json({ message: "No file uploaded." });

      const { category, year, title, caption, exercise } = req.body;

      const asset = await Asset.create({
        userId: req.userId,
        category: category || "",
        year: year || "",
        title: title || "",
        caption: caption || "",
        exercise: exercise || "",

        filename: main.filename,
        originalName: main.originalname,
        mimeType: main.mimetype,
        size: main.size,
        url: `/uploads/${main.filename}`,

        // ✅ extra previewUrl (indien aanwezig)
        previewUrl: preview ? `/uploads/${preview.filename}` : "",
      });

      const user = await User.findByIdAndUpdate(
        req.userId,
        { $inc: { uploadCount: 1 } },
        { new: true }
      );

      res.status(201).json({
        asset,
        uploadCount: user?.uploadCount ?? null,
      });
    } catch (err) {
      console.error("ASSET UPLOAD ERROR:", err);
      res.status(500).json({ message: "Upload failed." });
    }
  }
);


module.exports = router;
