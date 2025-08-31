const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getAllOrders); // Get all orders
router.get('/:id', orderController.getOrderById); // Get order by ID

router.post('/', orderController.createOrder); // Create new order
router.put('/:id', orderController.updateOrder); // Update order
router.delete('/:id', orderController.deleteOrder); // Delete order

module.exports = router;
