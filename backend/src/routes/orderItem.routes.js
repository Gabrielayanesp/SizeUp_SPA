const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItem.controller');

router.get('/', orderItemController.getAllOrderItems); // Get all order items
router.get('/:id', orderItemController.getOrderItemById); // Get order item by ID

router.post('/', orderItemController.createOrderItem); // Create new order item
router.put('/:id', orderItemController.updateOrderItem); // Update order item
router.delete('/:id', orderItemController.deleteOrderItem); // Delete order item

module.exports = router;
