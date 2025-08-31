const Role = require('../models/role.model');

const roleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all roles', error: error.message });
        }
    },

    getRoleById: async (req, res) => {
        try {
            const role = await Role.getById(req.params.id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error getting role', error: error.message });
        }
    },

    createRole: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Role name is required.' });
        }

        try {
            const newRoleId = await Role.create(req.body);
            res.status(201).json({ message: 'Role created successfully!', id: newRoleId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating role', error: error.message });
        }
    },

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;
            await Role.update(id, req.body);
            res.status(200).json({ message: 'Role updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { id } = req.params;
            await Role.delete(id);
            res.status(200).json({ message: 'Role deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
};

module.exports = roleController;
