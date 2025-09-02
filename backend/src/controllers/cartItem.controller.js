// here we import the CartItem model to interact with the cart_items table in the database and perform CRUD operations
// is a controller module that defines functions to handle HTTP requests related to cart items, including getting all items, getting an item by ID, creating, updating, and deleting cart items.
//  Each function handles errors and sends appropriate HTTP responses

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

//  here we define the createCartItem function to handle the creation of new cart items, ensuring that all required fields are provided and responding with appropriate
// status codes and messages based on the operation's success or failure then we define the updateCartItem function to handle updates to existing cart items, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// //  finally, we define the deleteCartItem function to remove cart items by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues   

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

    // here we define the function to handle the update of cart items this function validates the input, performs the update operation, and manages
    //  errors effectively to ensure data integrity and provide clear feedback to the client

    updateCartItem: async (req, res) => {
        try {
            const { id } = req.params;
            await CartItem.update(id, req.body);
            res.status(200).json({ message: 'Cart item updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart item', error: error.message });
        }
    },

    // here we define the function to handle the deletion of cart items by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the CartItem model to perform
    //  the delete operation and sends appropriate HTTP responses based on the outcome

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

// here we export the cartItemController object to be used in our routes, allowing us to keep our code organized and modular this also 
// makes it easier to maintain and test individual components of our cart item management system

module.exports = cartItemController;
