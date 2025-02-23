const Order = require('../models/Order'); // Verify this path is correct

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find().populate('request');
    res.json(orders);
  } catch (error) {
    console.error('Error in getOrderHistory:', error);
    res.status(500).json({ message: 'Server error fetching order history' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status;
    order.trackingHistory.push({ status });
    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
};

module.exports = { getOrderHistory, updateOrderStatus };