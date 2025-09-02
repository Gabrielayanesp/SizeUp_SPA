// here we import the User model to interact with the users table in the database and perform CRUD operations
// // is a controller module that defines functions to handle HTTP requests related to users, including getting all users, getting a user by ID, creating, updating, and deleting users.
// //  Each function handles errors and sends appropriate HTTP responses   

const User = require('../models/user.model');

// here we define the userController object that contains all the methods for handling user related requests
// // //  each method is responsible for a specific CRUD operation and includes error handling to ensure robust and reliable interactions with the database    
const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all users', error: error.message });
        }
    },

    // here we define the getUserById function to retrieve a specific user by its ID, handling cases where the user may not exist and ensuring proper error management to provide clear feedback to the client this function
    // //  interacts with the User model to fetch the data and sends appropriate HTTP responses based on the outcome   

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

    // here we define the createUser function to handle the creation of new users, ensuring that all required fields are provided and responding with appropriate
// // status codes and messages based on the operation's success or failure then we define the updateUser function to handle updates to existing users, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// // //  finally, we define the deleteUser function to remove users by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues  

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

//     here we define the updateUser function to handle updates to existing users, validating input and managing
// //  errors effectively to maintain data integrity and provide clear feedback to the client this function is important for allowing modifications to user details 
// // while ensuring that any issues during the update process are properly communicated   

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            await User.update(id, req.body);
            res.status(200).json({ message: 'User updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

//     here we define the deleteUser function to remove users by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the User model to perform
// // //  the delete operation and sends appropriate HTTP responses based on the outcome

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

// here we export the userController object to be used in our routes, allowing us to keep our code organized and modular this also
// // // // // makes it easier to maintain and test individual components of our user management system    

module.exports = userController;
