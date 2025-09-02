// here we import the OrderItem model to interact with the order_items table in the database and perform CRUD operations
// // is a controller module that defines functions to handle HTTP requests related to order items, including getting all items, getting an item by ID, creating, updating, and deleting order items.
// //  Each function handles errors and sends appropriate HTTP responses   

const OrderItem = require('../models/orderItem.model');

// here we define the orderItemController object that contains all the methods for handling order item related requests
// //  each method is responsible for a specific CRUD operation and includes error handling to ensure robust and reliable interactions with the database   

const orderItemController = {
    getAllOrderItems: async (req, res) => {
        try {
            const orderItems = await OrderItem.getAll();
            res.json(orderItems);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all order items', error: error.message });
        }
    },

    // here we define the getOrderItemById function to retrieve a specific order item by its ID, handling cases where the order item may not exist and ensuring proper error management to provide clear feedback to the client this function
    // //  interacts with the OrderItem model to fetch the data and sends appropriate HTTP responses based on the outcome  

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

//     here we define the createOrderItem function to handle the creation of new order items, ensuring that all required fields are provided and responding with appropriate
// // status codes and messages based on the operation's success or failure then we define the updateOrderItem function to handle updates to existing order items, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// // //  finally, we define the deleteOrderItem function to remove order items by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues      

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

    // HERE we define the updateOrderItem function to handle updates to existing order items, validating input and managing
    // //  errors effectively to maintain data integrity and provide clear feedback to the client this function is important for allowing modifications to order item details while ensuring that any issues during the update process are properly communicated   

    updateOrderItem: async (req, res) => {
        try {
            const { id } = req.params;
            await OrderItem.update(id, req.body);
            res.status(200).json({ message: 'Order item updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order item', error: error.message });
        }
    },

    // HERE we define the deleteOrderItem function to remove order items by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the OrderItem model to perform
    // //  the delete operation and sends appropriate HTTP responses based on the outcome  

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

// HERE we export the orderItemController object to be used in our routes, allowing us to keep our code organized and modular this also
// // // makes it easier to maintain and test individual components of our order item management system    

module.exports = orderItemController;
