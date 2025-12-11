const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    year: { type: Number, required: true },
    degree: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    filePath: { type: String, required: true }, // pad naar het geüploade bestand
    originalName: { type: String },             // oorspronkelijke bestandsnaam
  },
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);
