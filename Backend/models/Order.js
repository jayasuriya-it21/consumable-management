const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  status: { type: String, enum: ['pending', 'delivered', 'returned'], default: 'pending' },
  trackingHistory: [{ status: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('Order', orderSchema);