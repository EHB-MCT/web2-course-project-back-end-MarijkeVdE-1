const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // simple string zoals in je voorbeeld
    programme: { type: String, required: true }, // opleiding / richting
    year: { type: Number, required: true },
    degree: { type: String, required: true }, // Bachelor / Graduaat
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
