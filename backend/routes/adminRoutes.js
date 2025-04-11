// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../jewellery.json');

// Helper to read data
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Add jewellery item
// Dummy login route to authenticate users
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const usersPath = path.join(__dirname, '../users.json');

  try {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      res.json({ role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error reading user data' });
  }
});

router.post('/add', (req, res) => {
  const newItem = req.body;
  const items = readData();

  // Auto-generate ID
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push(newItem);

  writeData(items);
  res.status(201).json({ message: 'Item added successfully' });
});

// Delete jewellery item
router.delete('/delete/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  let items = readData();
  items = items.filter(item => item.id !== itemId);

  writeData(items);
  res.json({ message: 'Item deleted successfully' });
});

// Update jewellery item
router.put('/update/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  let items = readData();

  items = items.map(item => item.id === itemId ? { ...item, ...updatedItem, id: itemId } : item);

  writeData(items);
  res.json({ message: 'Item updated successfully' });
});

module.exports = router;
