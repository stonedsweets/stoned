// controllers/orderController.js
const Order = require('../models/Order');
const Counter = require('../models/Counter');

exports.placeOrder = async (req, res) => {
  try {
      const { cart, phoneNumber, paymentMethod } = req.body;

      if (!phoneNumber) {
          return res.status(400).json({ error: 'Phone number is required' });
      }

      const newOrder = new Order({
          phoneNumber,
          paymentMethod,
          cart,
      });

      await newOrder.save();
      res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

