const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },

    filename: { 
      type: String, 
      required: true 
    },

    originalName: { 
      type: String, 
      required: true 
    },

    mimeType: { 
      type: String, 
      required: true 
    },

    size: { 
      type: Number, 
      required: true 
    },

    url: { 
      type: String, 
      required: true 
    }, // bv /uploads/12345.png

    caption: { 
      type: String, 
      trim: true },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);
