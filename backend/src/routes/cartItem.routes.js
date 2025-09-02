const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItem.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.verifyToken, cartItemController.getAllCartItems); // Get all cart items
router.get('/:id', authMiddleware.verifyToken, cartItemController.getCartItemById); // Get cart item by ID

router.post('/', authMiddleware.verifyToken, cartItemController.createCartItem); // Add item to cart
router.put('/:id', authMiddleware.verifyToken, cartItemController.updateCartItem); // Update cart item
router.delete('/:id', authMiddleware.verifyToken, cartItemController.deleteCartItem); // Delete cart item

module.exports = router;
