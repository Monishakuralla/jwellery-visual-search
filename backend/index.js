//C:\Users\hanis\jewellery-search\backend\index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const adminRoutes = require('./routes/adminRoutes');
const jewelleryRoutes = require('./routes/jewelleryRoutes');
const authRoutes = require('./routes/authRoutes'); // Ensure this file exists

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Use only necessary routes
app.use('/api', authRoutes);
app.use('/api/jewellery', jewelleryRoutes);
app.use('/api/admin', adminRoutes); // ✅ This enables /api/admin/items

// Serve images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    matches: ['jwellery1.jpg', 'jwellery2.jpg', 'jwellery3.jpg']
  });
});

// Admin Routes for managing items
app.get('/api/admin/items', (req, res) => {
  fs.readFile('./data/jewellery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read jewellery data.' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/admin/add', (req, res) => {
  const newItem = req.body;
  fs.readFile('./data/jewellery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read jewellery data.' });
    }

    const items = JSON.parse(data);
    items.push(newItem);

    fs.writeFile('./data/jewellery.json', JSON.stringify(items), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add new item.' });
      }
      res.status(201).json({ message: 'Item added successfully!' });
    });
  });
});

app.delete('/api/admin/delete/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./data/jewellery.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read jewellery data.' });
    }

    let items = JSON.parse(data);
    items = items.filter(item => item.id !== id);

    fs.writeFile('./data/jewellery.json', JSON.stringify(items), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete item.' });
      }
      res.status(200).json({ message: 'Item deleted successfully!' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

