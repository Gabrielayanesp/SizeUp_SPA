const Order = require('../models/order.model');

// here we import the Order model to interact with the orders table in the database and perform CRUD operations
// is a controller module that defines functions to handle HTTP requests related to orders, including getting all orders, getting an order by ID, creating, updating, and deleting orders.
//  Each function handles errors and sends appropriate HTTP responses  

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.getAll();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all orders', error: error.message });
        }
    },

    // here we define the getOrderById function to retrieve a specific order by its ID, handling cases where the order may not exist and ensuring proper error management to provide clear feedback to the client this function
    //  interacts with the Order model to fetch the data and sends appropriate HTTP responses based on the outcome

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

    // here we define the createOrder function to handle the creation of new orders, ensuring that all required fields are provided and responding with appropriate
// status codes and messages based on the operation's success or failure then we define the updateOrder function to handle updates to existing orders, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// //  finally, we define the deleteOrder function to remove orders by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues

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

    // here we define the updateOrder function to handle updates to existing orders, validating input and managing
    //  errors effectively to maintain data integrity and provide clear feedback to the client this function is important for allowing modifications to order details while ensuring that any issues during the update process are properly communicated    

    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            await Order.update(id, req.body);
            res.status(200).json({ message: 'Order updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order', error: error.message });
        }
    },

    // here we define the deleteOrder function to remove orders by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the Order model to perform
    // //  the delete operation and sends appropriate HTTP responses based on the outcome

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

// here we export the orderController object to be used in our routes, allowing us to keep our code organized and modular this also
// // makes it easier to maintain and test individual components of our order management system    

module.exports = orderController;
