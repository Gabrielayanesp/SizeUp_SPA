// here we import the database connection pool to interact with the MySQL database
// //  allows for efficient management of database connections in a Node.js application

const pool = require('./db');

// here we define the Role model that contains methods for performing CRUD operations on the roles table in the database
// // //  each method interacts with the database using SQL queries and returns the results or performs the necessary actions

const Role = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM roles');
        return rows;
    },

    // here we define the getById method to retrieve a specific role by its ID, returning the role if found or undefined if not found
    // // //  this method is important for fetching individual roles and handling cases where the role may not exist in the database

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [id]);
        return rows[0];
    },

    // here we define the create method to add a new role to the database, returning the ID of the newly created role
    // //  this method is essential for allowing users to add new roles and manage role-based access control

    create: async (role) => {
        const { name } = role;
        const [result] = await pool.query('INSERT INTO roles (name) VALUES (?)', [name]);
        return result.insertId;
    },

    // here we define the update method to modify an existing role in the database, returning true if the update was successful
    // //  this method allows users to change role details and ensures that the database reflects these changes accurately

    update: async (id, role) => {
        const { name } = role;
        await pool.query('UPDATE roles SET name = ? WHERE id = ?', [name, id]);
        return true;
    },
    // here we define the delete method to remove a role from the database by its ID, returning true if the deletion was successful
    // //  this method is crucial for allowing users to manage their roles and remove roles they no longer wish to keep

    delete: async (id) => {
        await pool.query('DELETE FROM roles WHERE id = ?', [id]);
        return true;
    }
};
// here we export the Role model to be used in other parts of the application, allowing us to keep our code organized and modular
// //  this also makes it easier to maintain and test individual components of our role management system

module.exports = Role;
