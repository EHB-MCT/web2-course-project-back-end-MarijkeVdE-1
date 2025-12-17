
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
  

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    programme: { 
      type: String, 
      required: true 
    },

    year: { 
      type: Number, 
      required: true 
    },

    degree: {
       type: String, 
       required: true 
      },

    description: { 
      type: String 
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
