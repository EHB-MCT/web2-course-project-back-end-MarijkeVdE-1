// Ik geef één uitgewerkt voorbeeld per type (dan kun je de rest copy-pasten en aanpassen).

const express = require('express');
const Exercise = require('../models/Exercise');

const router = express.Router();

// GET /api/exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/exercises
router.post('/', async (req, res) => {
  try {
    const { title, category, programme, year, degree, description } = req.body;

    if (!title || !category || !programme || !year || !degree) {
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
    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
