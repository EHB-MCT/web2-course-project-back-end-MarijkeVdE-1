const express = require('express');
const mongoose = require('mongoose');
const Exercise = require('../models/exercise');

const router = express.Router();

// helper: check of id geldig is
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/exercises/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/exercises
router.post('/', async (req, res) => {
  try {
    const { title, category, programme, year, degree, description } = req.body;

    if (!title || !category || !programme || year === undefined || !degree) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const exercise = await Exercise.create({
      title,
      category,
      programme,
      year,
      degree,
      description,
    });

    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/exercises/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    // (optioneel) voorkom dat iemand _id overschrijft
    const { _id, ...updates } = req.body;

    const updated = await Exercise.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/exercises/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const deleted = await Exercise.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // 204 = ok maar geen body
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;