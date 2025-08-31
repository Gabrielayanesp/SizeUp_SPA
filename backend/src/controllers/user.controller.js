const User = require('../models/user.model');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all users', error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.getById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error getting user', error: error.message });
        }
    },

    createUser: async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required fields.' });
        }

        try {
            const newUserId = await User.create(req.body);
            res.status(201).json({ message: 'User created successfully!', id: newUserId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            await User.update(id, req.body);
            res.status(200).json({ message: 'User updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await User.delete(id);
            res.status(200).json({ message: 'User deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
};

module.exports = userController;
