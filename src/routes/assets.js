// Ik geef één uitgewerkt voorbeeld per type (dan kun je de rest copy-pasten en aanpassen).

const express = require('express');
const Asset = require('../models/asset');
const upload = require('../middleware/upload');

const router = express.Router();

// GET /api/assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find().populate('exercise');
    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/assets  (multipart/form-data)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, exercise, year, degree, category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const asset = await Asset.create({
      title,
      exercise,
      year,
      degree,
      category,
      description,
      filePath: req.file.path,
      originalName: req.file.originalname,
    });

    res.status(201).json(asset);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
