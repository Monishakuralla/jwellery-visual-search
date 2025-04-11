const userRoutes = require('./routes/users');

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

app.use(cors());
app.use('/jewellery_dataset', express.static(path.join(__dirname, 'jewellery_dataset')));
app.use(express.json());
app.use('/api/users', userRoutes);



// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload to this folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  },
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);

  // Call the Python script to search similar images
  const pythonProcess = spawn('python', ['search_similar.py', uploadedFilePath]);

  let results = [];
  pythonProcess.stdout.on('data', (data) => {
    results.push(data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`❌ Python error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      const output = results.join('').split('\n').filter(Boolean); // remove empty lines
      res.json({ matches: output });
    } else {
      res.status(500).json({ error: 'Python script failed' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Search API server running on port ${PORT}`);
});
