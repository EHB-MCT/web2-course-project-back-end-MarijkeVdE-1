const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('../models/feedback');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

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
    const { exercise, comment, rating } = req.body;

    if (!exercise || !comment) {
      return res
        .status(400)
        .json({ message: 'Missing required fields (exercise, comment)' });
    }

    const feedback = await Feedback.create({ exercise, comment, rating });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/feedback/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const deleted = await Feedback.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
