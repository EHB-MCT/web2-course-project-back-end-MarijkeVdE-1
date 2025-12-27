const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    category: String,
    year: String,
    title: String,
    caption: String,

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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
