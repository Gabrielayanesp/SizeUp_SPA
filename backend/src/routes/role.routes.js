const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.get('/', roleController.getAllRoles); // Get all roles
router.get('/:id', roleController.getRoleById); // Get role by ID

router.post('/', roleController.createRole); // Create new role
router.put('/:id', roleController.updateRole); // Update role
router.delete('/:id', roleController.deleteRole); // Delete role

module.exports = router;
