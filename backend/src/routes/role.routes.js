// here we set up the Express router to handle routes related to roles, including creating, updating, retrieving, and deleting roles
// // // // // // //  this router connects the routes to their respective controller functions for processing requests and sending responses

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.get('/', roleController.getAllRoles); // Get all roles
router.get('/:id', roleController.getRoleById); // Get role by ID

router.post('/', roleController.createRole); // Create new role
router.put('/:id', roleController.updateRole); // Update role
router.delete('/:id', roleController.deleteRole); // Delete role

// here we export the router to be used in the main application, allowing us to keep our code modular and organized
// // // // // // // // //  this also makes it easier to maintain and test individual components of our routing system

module.exports = router;
