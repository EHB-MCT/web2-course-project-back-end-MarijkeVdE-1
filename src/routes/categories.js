// Ik geef één uitgewerkt voorbeeld per type (dan kun je de rest copy-pasten en aanpassen).

const express = require('express');
const Category = require('../models/category');

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
