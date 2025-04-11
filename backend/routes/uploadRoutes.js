//C:\Users\hanis\jewellery-search\backend\routes\uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Simulate matches
  const matches = ['jwellery1.jpg', 'jwellery2.jpg', 'jwellery3.jpg'];
  res.json({ matches });
});

module.exports = router;
