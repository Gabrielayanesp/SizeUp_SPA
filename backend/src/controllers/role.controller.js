// HERE we import the Role model to interact with the roles table in the database and perform CRUD operations
// // is a controller module that defines functions to handle HTTP requests related to roles, including getting all roles, getting a role by ID, creating, updating, and deleting roles.
// //  Each function handles errors and sends appropriate HTTP responses   

const Role = require('../models/role.model');

// HERE we define the roleController object that contains all the methods for handling role related requests
// //  each method is responsible for a specific CRUD operation and includes error handling to ensure robust and reliable interactions with the database    

const roleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error getting all roles', error: error.message });
        }
    },

    // HERE we define the getRoleById function to retrieve a specific role by its ID, handling cases where the role may not exist and ensuring proper error management to provide clear feedback to the client this function
    // //  interacts with the Role model to fetch the data and sends appropriate HTTP responses based on the outcome   

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

    // HERE we define the createRole function to handle the creation of new roles, ensuring that all required fields are provided and responding with appropriate
// // status codes and messages based on the operation's success or failure then we define the updateRole function to handle updates to existing roles, validating input and managing errors effectively to maintain data integrity and provide clear feedback to the client
// // //  finally, we define the deleteRole function to remove roles by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues  

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

//     here we define the updateRole function to handle updates to existing roles, validating input and managing
// //  errors effectively to maintain data integrity and provide clear feedback to the client this function is important for allowing modifications to role details 
// // while ensuring that any issues during the update process are properly communicated   

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;
            await Role.update(id, req.body);
            res.status(200).json({ message: 'Role updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    },

//     here we define the deleteRole function to remove roles by ID, ensuring proper error handling and response messaging to confirm the deletion or report issues this function interacts with the Role model to perform
// // //  the delete operation and sends appropriate HTTP responses based on the outcome   

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

// here we export the roleController object to be used in our routes, allowing us to keep our code organized and modular this also
// // // // makes it easier to maintain and test individual components of our role management system   

module.exports = roleController;
