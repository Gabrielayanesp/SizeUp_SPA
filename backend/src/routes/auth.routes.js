// here we set up the Express router to handle authentication-related routes such as login, registration, and logout
// // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// here we define the routes for login, registration, and logout, linking each route to the corresponding function in the authController
// // // // //  this setup allows for organized handling of authentication-related HTTP requests in the application
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // //  this also makes it easier to maintain and test individual components of our routing system
module.exports = router; 