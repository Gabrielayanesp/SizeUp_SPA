const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.optionalAuth, userController.getAllUsers); // Get all users
router.get('/:id', authMiddleware.optionalAuth, userController.getUserById); // Get user by ID

router.post('/', userController.createUser); // Create new user (no auth for registration)
router.put('/:id', authMiddleware.verifyToken, userController.updateUser); // Update user
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser); // Delete user

module.exports = router;
