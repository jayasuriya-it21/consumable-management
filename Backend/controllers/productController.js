const Product = require('../models/Product');

const addProduct = async (req, res) => {
  const { productId, name, stock, images, returnable } = req.body;
  const product = new Product({ productId, name, stock, images, returnable });
  await product.save();
  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

module.exports = { addProduct, getProducts, updateProduct };