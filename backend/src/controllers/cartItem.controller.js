const CartItem = require('../models/cartItem.model');

const cartItemController = {
    getAllCartItems: async (req, res) => {
        try {
            const items = await CartItem.getAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all cart items', error: error.message });
        }
    },

    getCartItemById: async (req, res) => {
        try {
            const item = await CartItem.getById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            res.json(item);
        } catch (error) {
            res.status(500).json({ message: 'Error getting cart item', error: error.message });
        }
    },

    createCartItem: async (req, res) => {
        const { user_id, product_id, quantity } = req.body;

        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ message: 'user_id, product_id and quantity are required.' });
        }

        try {
            const newItemId = await CartItem.create(req.body);
            res.status(201).json({ message: 'Cart item added successfully!', id: newItemId });
        } catch (error) {
            res.status(500).json({ message: 'Error adding cart item', error: error.message });
        }
    },

    updateCartItem: async (req, res) => {
        try {
            const { id } = req.params;
            await CartItem.update(id, req.body);
            res.status(200).json({ message: 'Cart item updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart item', error: error.message });
        }
    },

    deleteCartItem: async (req, res) => {
        try {
            const { id } = req.params;
            await CartItem.delete(id);
            res.status(200).json({ message: 'Cart item deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting cart item', error: error.message });
        }
    }
};

module.exports = cartItemController;
