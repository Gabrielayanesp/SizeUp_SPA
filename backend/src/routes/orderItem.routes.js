// here we set up the Express router to handle routes related to order items, including creating, updating, retrieving, and deleting order items
// // // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItem.controller');

// here we define the routes for order item operations, linking each route to the corresponding function in the orderItemController
// // // // // //  we do not apply authentication middleware here, but it can be added if needed to protect these routes

router.get('/', orderItemController.getAllOrderItems); // Get all order items
router.get('/:id', orderItemController.getOrderItemById); // Get order item by ID

router.post('/', orderItemController.createOrderItem); // Create new order item
router.put('/:id', orderItemController.updateOrderItem); // Update order item
router.delete('/:id', orderItemController.deleteOrderItem); // Delete order item

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // // //  this also makes it easier to maintain and test individual components of our routing system

module.exports = router;
