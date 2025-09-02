// here we set up the Express router to handle routes related to orders, including creating, updating, retrieving, and deleting orders
// // // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

// here we define the routes for order operations, linking each route to the corresponding function in the orderController
// // // // // // //  we also apply authentication middleware to protect these routes, ensuring that only authorized users can access them
router.get('/', authMiddleware.verifyToken, orderController.getAllOrders); // Get all orders
router.get('/:id', authMiddleware.verifyToken, orderController.getOrderById); // Get order by ID

router.post('/', authMiddleware.verifyToken, orderController.createOrder); // Create new order
router.put('/:id', authMiddleware.verifyToken, orderController.updateOrder); // Update order
router.delete('/:id', authMiddleware.verifyToken, orderController.deleteOrder); // Delete order

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // // //  this also makes it easier to maintain and test individual components of our routing system

module.exports = router;
