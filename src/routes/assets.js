const router = require("express").Router();
const upload = require("../middleware/upload");
const Asset = require("../models/asset");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { category, year, title, caption } = req.body;

    const asset = await Asset.create({
      category,
      year,
      title,
      caption,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
