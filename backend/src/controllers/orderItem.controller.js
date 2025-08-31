const OrderItem = require('../models/orderItem.model');

const orderItemController = {
    getAllOrderItems: async (req, res) => {
        try {
            const orderItems = await OrderItem.getAll();
            res.json(orderItems);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all order items', error: error.message });
        }
    },

    getOrderItemById: async (req, res) => {
        try {
            const orderItem = await OrderItem.getById(req.params.id);
            if (!orderItem) {
                return res.status(404).json({ message: 'Order item not found' });
            }
            res.json(orderItem);
        } catch (error) {
            res.status(500).json({ message: 'Error getting order item', error: error.message });
        }
    },

    createOrderItem: async (req, res) => {
        const { order_id, product_id, quantity, price } = req.body;

        if (!order_id || !product_id || !quantity || !price) {
            return res.status(400).json({ message: 'order_id, product_id, quantity, and price are required.' });
        }

        try {
            const newOrderItemId = await OrderItem.create(req.body);
            res.status(201).json({ message: 'Order item created successfully!', id: newOrderItemId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating order item', error: error.message });
        }
    },

    updateOrderItem: async (req, res) => {
        try {
            const { id } = req.params;
            await OrderItem.update(id, req.body);
            res.status(200).json({ message: 'Order item updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order item', error: error.message });
        }
    },

    deleteOrderItem: async (req, res) => {
        try {
            const { id } = req.params;
            await OrderItem.delete(id);
            res.status(200).json({ message: 'Order item deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order item', error: error.message });
        }
    }
};

module.exports = orderItemController;
