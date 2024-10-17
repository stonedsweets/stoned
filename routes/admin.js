const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Display add product form
router.get('/addProducts',  adminController.getAddProduct);

// Handle adding a new product
router.post('/addProducts',  adminController.postAddProduct);

// Display orders
router.get('/orders',  adminController.getOrders);

// Display today's order summary
router.get('/order-summary',  adminController.getOrderSummary);

// Display edit product form
router.get('/editProduct/:id',  adminController.getEditProduct);

// Handle editing a product
router.post('/editProduct/:id',  adminController.postEditProduct);

// Handle  deleting a product
router.post('/deleteProduct/:id',  adminController.deleteProduct);

// Assuming you have a router defined in your admin routes file
router.post('/orders/clear/:id',  adminController.clearOrder);


module.exports = router;