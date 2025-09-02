// here we set up the Express router to handle routes related to users, including creating, updating, retrieving, and deleting users
// // // // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// here we define the routes for user operations, linking each route to the corresponding function in the userController
// // // // // // // //  we apply authentication middleware to protect certain routes, ensuring that only authorized users can access them

router.get('/', authMiddleware.optionalAuth, userController.getAllUsers); // Get all users
router.get('/:id', authMiddleware.optionalAuth, userController.getUserById); // Get user by ID

router.post('/', userController.createUser); // Create new user (no auth for registration)
router.put('/:id', authMiddleware.verifyToken, userController.updateUser); // Update user
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser); // Delete user

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // // // //  this also makes it easier to maintain and test individual components of our routing system
module.exports = router;
