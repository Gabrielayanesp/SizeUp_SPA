const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItem.controller');

router.get('/', cartItemController.getAllCartItems); // Get all cart items
router.get('/:id', cartItemController.getCartItemById); // Get cart item by ID

router.post('/', cartItemController.createCartItem); // Add item to cart
router.put('/:id', cartItemController.updateCartItem); // Update cart item
router.delete('/:id', cartItemController.deleteCartItem); // Delete cart item

module.exports = router;
