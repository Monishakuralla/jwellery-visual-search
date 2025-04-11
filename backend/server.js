// backend/server.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/jewellery_dataset', express.static(path.join(__dirname, 'jewellery_dataset')));

// Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // ✅ Login handled here only

// Route to get all jewellery items
app.get('/api/jewellery', (req, res) => {
  const filePath = path.join(__dirname, 'jewellery.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });

    const jewelleryData = JSON.parse(data);
    res.status(200).json(jewelleryData);
  });
});

// Upload image API (for visual search)
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Simulate image search result
  const matches = ['jwellery1.jpg', 'jwellery3.jpg', 'jwellery5.jpg'];
  res.status(200).json({ matches });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
