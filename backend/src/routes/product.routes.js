// here we set up the Express router to handle routes related to products, including creating, updating, retrieving, and deleting products
// // // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getAllProducts); // Get all products
router.get('/:id', productController.getProductById); // Get product by ID

router.post('/', productController.createProduct); // Create new product
router.put('/:id', productController.updateProduct); // Update product
router.delete('/:id', productController.deleteProduct); // Delete product

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // // // //  this also makes it easier to maintain and test individual components of our routing system

module.exports = router;
