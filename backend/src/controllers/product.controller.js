// HERE we import the Product model to interact with the products table in the database and perform CRUD operations
// // is a controller module that defines functions to handle HTTP requests related to products, including getting all products, getting a product by ID, creating, updating, and deleting products.
// //  Each function handles errors and sends appropriate HTTP responses   

const Product = require('../models/product.model');

// HERE we define the productController object that contains all the methods for handling product related requests
// // //  each method is responsible for a specific CRUD operation and includes error handling to ensure robust and reliable interactions with the database    

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all products', error: error.message });
        }
    },

    // HERE we define the getProductById function to retrieve a specific product by its ID, handling cases where the product may not exist and ensuring proper error management to provide clear feedback to the client this function
    // //  interacts with the Product model to fetch the data and sends appropriate HTTP responses based on the outcome 

    getProductById: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error getting product', error: error.message });
        }
    },

    // HERE we define the createProduct function to handle the creation of new products, ensuring that all required fields are provided and responding with appropriate
// // status codes and messages based on the operation's success or failure then we define the updateProduct function to handle updates to existing products, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// // //  finally, we define the deleteProduct function to remove products by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues    

    createProduct: async (req, res) => {
        const { name, description, price, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required fields.' });
        }

        try {
            const newProductId = await Product.create(req.body);
            res.status(201).json({ message: 'Product created successfully!', id: newProductId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    },

    // HERE we define the updateProduct function to handle updates to existing products, validating input and managing
//  errors effectively to maintain data integrity and provide clear feedback to the client this function is important for allowing modifications to product details 
// while ensuring that any issues during the update process are properly communicated  

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.update(id, req.body);
            res.status(200).json({ message: 'Product updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    },

//     HERE we define the deleteProduct function to remove products by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the Product model to perform
// //  the delete operation and sends appropriate HTTP responses based on the outcome  

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.delete(id);
            res.status(200).json({ message: 'Product deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    }
};

// HERE we export the productController object to be used in our routes, allowing us to keep our code organized and modular this also
// // // makes it easier to maintain and test individual components of our product management system   

module.exports = productController;
