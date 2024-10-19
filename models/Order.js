// models/Order.js
const mongoose = require('mongoose');

// Change tableNumber to phoneNumber in the schema
const OrderSchema = new mongoose.Schema({
    cart: {
        type: Array,
        required: true,
    },
    phoneNumber: { // Updated from tableNumber to phoneNumber
        type: String,
        required: [true, 'Phone number is required'],
    },
    paymentMethod: {
        type: String,
        required: true,
    }
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;