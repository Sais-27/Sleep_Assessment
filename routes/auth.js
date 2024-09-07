const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');  // Import the User model

// Signup route
router.post('/signup', async (req, res) => {
  const { nickname, password } = req.body;

  // Check if user already exists in MongoDB
  const existingUser = await User.findOne({ nickname });
  if (existingUser) {
    return res.status(400).send('Nickname already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to MongoDB
  const user = new User({ nickname, password: hashedPassword });
  await user.save();

  res.status(201).send('User registered successfully');
});

module.exports = router;
const jwt = require('jsonwebtoken');

// Login route
router.post('/login', async (req, res) => {
  const { nickname, password } = req.body;

  // Find user by nickname in MongoDB
  const user = await User.findOne({ nickname });
  if (!user) return res.status(400).send('User not found');

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid password');

  // Generate JWT token
  const token = jwt.sign({ nickname: user.nickname }, 'mysecretkey', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
const authenticateToken = require('../middleware/auth');

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.user.nickname}. This is a protected route.`);
});