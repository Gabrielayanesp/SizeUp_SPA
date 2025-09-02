// HERE we import the ProductVariant model to interact with the product_variants table in the database and perform CRUD operations
// // is a controller module that defines functions to handle HTTP requests related to product variants, including getting all variants, getting a variant by ID, creating, updating, and deleting product variants.
// //  Each function handles errors and sends appropriate HTTP responses   

const ProductVariant = require('../models/productVariant.model');

const productVariantController = {
    getAllVariants: async (req, res) => {
        try {
            const variants = await ProductVariant.getAll();
            res.json(variants);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all product variants', error: error.message });
        }
    },

    // HERE we define the getVariantById function to retrieve a specific product variant by its ID, handling cases where the variant may not exist and ensuring proper error management to provide clear feedback to the client this function
    // //  interacts with the ProductVariant model to fetch the data and sends appropriate HTTP responses based on the outcome  

    getVariantById: async (req, res) => {
        try {
            const variant = await ProductVariant.getById(req.params.id);
            if (!variant) {
                return res.status(404).json({ message: 'Product variant not found' });
            }
            res.json(variant);
        } catch (error) {
            res.status(500).json({ message: 'Error getting product variant', error: error.message });
        }
    },

    // HERE we define the createVariant function to handle the creation of new product variants, ensuring that all required fields are provided and responding with appropriate
// // status codes and messages based on the operation's success or failure then we define the updateVariant function to handle updates to existing product variants, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// // //  finally, we define the deleteVariant function to remove product variants by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues    

    createVariant: async (req, res) => {
        const { product_id, name, value, price, stock } = req.body;

        if (!product_id || !name || !value || !price || !stock) {
            return res.status(400).json({ message: 'product_id, name, value, price and stock are required.' });
        }

        try {
            const newVariantId = await ProductVariant.create(req.body);
            res.status(201).json({ message: 'Product variant created successfully!', id: newVariantId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product variant', error: error.message });
        }
    },

    // HERE we define the updateVariant function to handle updates to existing product variants, validating input and managing
//  errors effectively to maintain data integrity and provide clear feedback to the client this function is important for allowing modifications to product variant details 
// while ensuring that any issues during the update process are properly communicated   

    updateVariant: async (req, res) => {
        try {
            const { id } = req.params;
            await ProductVariant.update(id, req.body);
            res.status(200).json({ message: 'Product variant updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product variant', error: error.message });
        }
    },

//     HERE we define the deleteVariant function to remove product variants by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the ProductVariant model to perform
// // //  the delete operation and sends appropriate HTTP responses based on the outcome   

    deleteVariant: async (req, res) => {
        try {
            const { id } = req.params;
            await ProductVariant.delete(id);
            res.status(200).json({ message: 'Product variant deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product variant', error: error.message });
        }
    }
};

// HERE we export the productVariantController object to be used in our routes, allowing us to keep our code organized and modular this also
// // // // makes it easier to maintain and test individual components of our product variant management system    

module.exports = productVariantController;
