// Ik geef één uitgewerkt voorbeeld per type (dan kun je de rest copy-pasten en aanpassen).

const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('exercise');
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const {
      title,
      exercise,
      category,
      programme,
      year,
      degree,
      message,
      rating,
    } = req.body;

    if (!title || !exercise || !category || !programme || !year || !degree || !message || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const feedback = await Feedback.create({
      title,
      exercise,
      category,
      programme,
      year,
      degree,
      message,
      rating,
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/feedback/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
