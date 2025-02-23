const validateRequest = (req, res, next) => {
    const { quantity, fromDate, toDate, productId } = req.body;
    if (!quantity || !fromDate || !productId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }
    next();
  };
  
  module.exports = validateRequest;