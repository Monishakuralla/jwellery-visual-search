//C:\Users\hanis\jewellery-search\backend\routes\searchRoute.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  const imagePath = req.file.path;

  const python = spawn('python', ['search_similar.py', imagePath]);

  let data = '';
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  python.on('close', () => {
    try {
      const matches = JSON.parse(data);
      res.json({ matches });
    } catch (err) {
      res.status(500).json({ error: 'Error processing image' });
    }
  });
});

module.exports = router;
