//C:\Users\hanis\jewellery-search\backend\routes\jewelleryRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dataPath = path.join(__dirname, '..', 'jewellery.json');

// Utility to read JSON file
const readJewelleryData = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Utility to write JSON file
const writeJewelleryData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all jewellery items
router.get('/', (req, res) => {
  const data = readJewelleryData();
  res.json(data);
});

// ADD a new jewellery item
router.post('/', (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const data = readJewelleryData();
  const newItem = { id: Date.now(), name, price, description, image };
  data.push(newItem);
  writeJewelleryData(data);
  res.json({ message: 'Jewellery item added', item: newItem });
});

// UPDATE a jewellery item by ID
router.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id); // Ensure the ID is parsed as an integer
  const updatedItem = req.body; // The updated data
  
  const data = readJewelleryData();
  const index = data.findIndex(item => item.id === id); // Find the item by ID
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  data[index] = { ...data[index], ...updatedItem }; // Update the item
  writeJewelleryData(data); // Save the updated data
  
  res.json({ message: 'Item updated successfully', item: data[index] });
});

// DELETE a jewellery item by ID
router.delete('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  let data = readJewelleryData();

  const exists = data.some(item => item.id === itemId);
  if (!exists) {
    return res.status(404).json({ error: 'Item not found' });
  }

  data = data.filter(item => item.id !== itemId);
  writeJewelleryData(data);
  res.json({ message: 'Jewellery item deleted' });
});

module.exports = router;
