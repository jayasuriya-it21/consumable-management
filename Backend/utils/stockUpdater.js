const Product = require('../models/Product');

const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  await product.save();
};

module.exports = { updateStock };