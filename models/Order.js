const mongoose = require('mongoose');
const moment = require('moment-timezone');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: Number, required: true, unique: true },
    items: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    phoneNumber: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['mobile-money', 'cash'],
    },
    placedAt: {
        type: Date,
        default: () => moment().tz('Africa/Nairobi').toDate(),  // Kenyan time
    },
    status: { type: String, default: 'active' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
