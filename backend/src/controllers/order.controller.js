const Order = require('../models/order.model');

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.getAll();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all orders', error: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await Order.getById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error getting order', error: error.message });
        }
    },

    createOrder: async (req, res) => {
        const { user_id, total_amount, status } = req.body;

        if (!user_id || !total_amount) {
            return res.status(400).json({ message: 'user_id and total_amount are required.' });
        }

        try {
            const newOrderId = await Order.create(req.body);
            res.status(201).json({ message: 'Order created successfully!', id: newOrderId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error: error.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            await Order.update(id, req.body);
            res.status(200).json({ message: 'Order updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order', error: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;
            await Order.delete(id);
            res.status(200).json({ message: 'Order deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order', error: error.message });
        }
    }
};

module.exports = orderController;
