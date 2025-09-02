// here we set up the Express router to handle routes related to product variants, including creating, updating, retrieving, and deleting product variants
// // // // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const productVariantController = require('../controllers/productVariant.controller');

// here we define the routes for product variant operations, linking each route to the corresponding function in the productVariantController
// // // // // // // //  we do not apply authentication middleware here, but it can be added if needed to protect these routes

router.get('/', productVariantController.getAllVariants); // Get all variants
router.get('/:id', productVariantController.getVariantById); // Get variant by ID

router.post('/', productVariantController.createVariant); // Create variant
router.put('/:id', productVariantController.updateVariant); // Update variant
router.delete('/:id', productVariantController.deleteVariant); // Delete variant

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // // // //  this also makes it easier to maintain and test individual components of our routing system

module.exports = router;

