const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String }], // URLs to images
  returnable: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);