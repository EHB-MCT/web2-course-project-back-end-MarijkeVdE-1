const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const Asset = require("../models/asset");
const auth = require("../middleware/auth"); // <-- zorg dat dit pad klopt bij jou

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

// Allow types (mimetype + extensie)
const allowedMimes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "video/mp4",

  // EPS komt vaak binnen als één van deze (kan verschillen per OS/browser)
  "application/postscript",
  "application/eps",
  "image/x-eps",
  "application/octet-stream", // sommige browsers sturen dit voor onbekende types
]);

const allowedExts = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
  ".mp4",
  ".eps",
]);

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const mimeOk = allowedMimes.has(file.mimetype);
  const extOk = allowedExts.has(ext);

  // We laten toe als extensie ok is EN mimetype ok-ish is.
  // (EPS wil nog wel eens als octet-stream binnenkomen)
  if (extOk && (mimeOk || file.mimetype === "application/octet-stream")) {
    return cb(null, true);
  }

  return cb(
    new Error("Only JPG/PNG/WEBP/PDF/MP4/EPS allowed"),
    false
  );
};

// ✅ kies hier je limiet
const MAX_MB = 25; // <-- pas aan naar 15 als jij dat liever hebt
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_MB * 1024 * 1024 },
});

// GET /api/assets (optioneel filter: ?exerciseId=...)
router.get("/", async (req, res) => {
  try {
    const { exerciseId } = req.query;
    const filter = {};

    if (exerciseId) {
      if (!isValidObjectId(exerciseId)) {
        return res.status(400).json({ message: "Invalid exerciseId" });
      }
      filter.exercise = exerciseId;
    }

    const assets = await Asset.find(filter)
      .populate("exercise")
      .sort({ createdAt: -1 });

    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/assets/upload
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { category, year, title, caption, exercise } = req.body;

    const asset = await Asset.create({
      user: req.user.id, // uit auth middleware
      category,
      year,
      title,
      caption,
      exercise,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(asset);
  } catch (err) {
    // Multer errors komen vaak hier binnen als gewone Error
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/assets/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const deleted = await Asset.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
