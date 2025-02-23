const Request = require('../models/Request');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { generateOrderId } = require('../utils/generateOrderId');
const { updateStock } = require('../utils/stockUpdater');

const createRequest = async (req, res) => {
  const { productId, quantity, description, fromDate, toDate } = req.body;
  const product = await Product.findById(productId);
  if (!product || quantity > product.stock) {
    return res.status(400).json({ message: 'Invalid product or insufficient stock' });
  }
  const request = new Request({
    user: req.user.id,
    product: productId,
    quantity,
    description,
    fromDate,
    toDate: product.returnable ? toDate : undefined,
  });
  await request.save();
  res.status(201).json(request);
};

const approveRequest = async (req, res) => {
  const { id } = req.params;
  const request = await Request.findById(id).populate('product');
  if (!request) return res.status(404).json({ message: 'Request not found' });
  request.status = 'approved';
  await request.save();
  await updateStock(request.product._id, request.quantity);
  const order = new Order({
    orderId: generateOrderId(),
    request: request._id,
    trackingHistory: [{ status: 'pending' }],
  });
  await order.save();
  res.json({ request, order });
};

const rejectRequest = async (req, res) => {
  const { id } = req.params;
  const request = await Request.findById(id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  request.status = 'rejected';
  await request.save();
  res.json(request);
};

const getRequests = async (req, res) => {
  const requests = await Request.find().populate('user product');
  res.json(requests);
};

module.exports = { createRequest, approveRequest, rejectRequest, getRequests };