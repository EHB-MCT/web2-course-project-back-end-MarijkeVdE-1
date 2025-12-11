const multer = require('multer');
const path = require('path');

// Storage-configuratie
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // zorg dat deze map bestaat
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Eenvoudige file filter (bv. enkel pdf/jpg/png)
const fileFilter = (req, file, cb) => {
  // hier kan je nog extra checks doen
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
