const express = require('express');
const router = express.Router();
const productVariantController = require('../controllers/productVariant.controller');

router.get('/', productVariantController.getAllVariants); // Get all variants
router.get('/:id', productVariantController.getVariantById); // Get variant by ID

router.post('/', productVariantController.createVariant); // Create variant
router.put('/:id', productVariantController.updateVariant); // Update variant
router.delete('/:id', productVariantController.deleteVariant); // Delete variant

module.exports = router;

