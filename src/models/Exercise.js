const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    programme: {
      type: String,
      required: true, // bv. Multimedia, Grafische Vormgeving
    },

    year: {
      type: Number,
      required: true, // bv. 1, 2, 3
    },

    degree: {
      type: String,
      required: true, // Bachelor / Graduaat
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
