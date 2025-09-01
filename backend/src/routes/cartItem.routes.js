// here we set up the Express router to handle routes related to cart items, including adding, updating, retrieving, and deleting items in the shopping cart
// // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItem.controller');
const authMiddleware = require('../middleware/auth.middleware');

// here we define the routes for cart item operations, linking each route to the corresponding function in the cartItemController
// // // // // //  we also apply authentication middleware to protect these routes, ensuring that only authorized users can access them

router.get('/', authMiddleware.verifyToken, cartItemController.getAllCartItems); // Get all cart items
router.get('/:id', authMiddleware.verifyToken, cartItemController.getCartItemById); // Get cart item by ID

router.post('/', authMiddleware.verifyToken, cartItemController.createCartItem); // Add item to cart
router.put('/:id', authMiddleware.verifyToken, cartItemController.updateCartItem); // Update cart item
router.delete('/:id', authMiddleware.verifyToken, cartItemController.deleteCartItem); // Delete cart item

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // //  this also makes it easier to maintain and test individual components of our routing system
module.exports = router;
