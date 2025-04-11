// backend/routes/authRoutes.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper to read users.json
const getUsers = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../users.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users.json:', err);
    return [];
  }
};

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    return res.json({
      message: 'Login successful',
      email: foundUser.email,
      role: foundUser.role,
      token: 'dummy-token'
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
