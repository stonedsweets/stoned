const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'KES' // Default currency is KES
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;