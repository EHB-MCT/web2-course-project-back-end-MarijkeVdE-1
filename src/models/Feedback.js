const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    category: { type: String, required: true },
    programme: { type: String, required: true },
    year: { type: Number, required: true },
    degree: { type: String, required: true },
    message: { type: String, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
