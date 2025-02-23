const express = require('express');
const { createRequest, approveRequest, rejectRequest, getRequests } = require('../controllers/requestController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const router = express.Router();

router.use(authenticate);
router.post('/', validateRequest, createRequest);
router.get('/', authorize('admin'), getRequests);
router.put('/approve/:id', authorize('admin'), approveRequest);
router.put('/reject/:id', authorize('admin'), rejectRequest);

module.exports = router;