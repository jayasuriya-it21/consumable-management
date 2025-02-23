const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password'); // Exclude password
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

module.exports = { getUsers, updateProfile, getProfile };