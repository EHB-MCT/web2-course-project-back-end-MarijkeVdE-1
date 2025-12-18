const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const Asset = require('../models/asset');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

// Allow only images + pdf (simpel en verdedigbaar)
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  return cb(new Error('Only JPG/PNG/WEBP/PDF allowed'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// GET /api/assets  (optioneel filter: ?exerciseId=...)
router.get('/', async (req, res) => {
  try {
    const { exerciseId } = req.query;
    const filter = {};

    if (exerciseId) {
      if (!isValidObjectId(exerciseId)) {
        return res.status(400).json({ message: 'Invalid exerciseId' });
      }
      filter.exercise = exerciseId;
    }

    const assets = await Asset.find(filter)
      .populate('exercise')
      .sort({ createdAt: -1 });

    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/assets/upload  (multer upload)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { exercise, caption } = req.body;

    if (!exercise) {
      return res.status(400).json({ message: 'Missing required field: exercise' });
    }
    if (!isValidObjectId(exercise)) {
      return res.status(400).json({ message: 'Invalid exercise id' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Missing file (field name must be "file")' });
    }

    const created = await Asset.create({
      exercise,
      caption,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/assets/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const deleted = await Asset.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Note: file verwijderen op schijf is optioneel (nice-to-have)
    res.status(200).json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
