const Product = require('../models/product.model');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all products', error: error.message });
        }
    },

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

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.update(id, req.body);
            res.status(200).json({ message: 'Product updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error: error.message });
        }
    },

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

module.exports = productController;
