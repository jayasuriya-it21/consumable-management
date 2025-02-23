const express = require('express');
const { getUsers, updateProfile, getProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.use(authenticate);
router.get('/', authorize('admin'), getUsers);
router.put('/profile', updateProfile);
router.get('/profile', getProfile); // New endpoint

module.exports = router;