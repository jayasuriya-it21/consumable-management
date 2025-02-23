const express = require('express');
const { getOrderHistory, updateOrderStatus } = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.use(authenticate);
router.get('/', getOrderHistory);
router.put('/:id', authorize('admin'), updateOrderStatus);

module.exports = router;