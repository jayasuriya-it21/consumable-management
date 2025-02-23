const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/authConfig');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email }); // Debugging log

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error); // Log the error
    res.status(500).json({ message: 'Server error during login' });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const role = adminSecret === process.env.ADMIN_SECRET ? 'admin' : 'user';
    const user = new User({ name, email, password, role });

    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, role });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

module.exports = { login, register };