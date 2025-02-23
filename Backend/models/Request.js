const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  fromDate: { type: Date, required: true },
  toDate: { type: Date }, // Required if returnable
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);