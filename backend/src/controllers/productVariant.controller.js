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

    updateVariant: async (req, res) => {
        try {
            const { id } = req.params;
            await ProductVariant.update(id, req.body);
            res.status(200).json({ message: 'Product variant updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product variant', error: error.message });
        }
    },

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

module.exports = productVariantController;
