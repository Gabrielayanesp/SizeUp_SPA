const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.verifyToken, orderController.getAllOrders); // Get all orders
router.get('/:id', authMiddleware.verifyToken, orderController.getOrderById); // Get order by ID

router.post('/', authMiddleware.verifyToken, orderController.createOrder); // Create new order
router.put('/:id', authMiddleware.verifyToken, orderController.updateOrder); // Update order
router.delete('/:id', authMiddleware.verifyToken, orderController.deleteOrder); // Delete order

module.exports = router;
