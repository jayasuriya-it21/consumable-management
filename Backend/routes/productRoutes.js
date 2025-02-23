const express = require('express');
const { addProduct, getProducts, updateProduct } = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.use(authenticate);
router.get('/', getProducts);
router.post('/', authorize('admin'), addProduct);
router.put('/:id', authorize('admin'), updateProduct);

module.exports = router;