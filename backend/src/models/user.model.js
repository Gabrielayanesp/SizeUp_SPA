// here we import the database connection pool to interact with the MySQL database
// // //  allows for efficient management of database connections in a Node.js application
const pool = require('./db');

// here we define the User model that contains methods for performing CRUD operations on the users table in the database
// // // //  each method interacts with the database using SQL queries and returns the results or performs the necessary actions

const User = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    },

    // here we define the getById method to retrieve a specific user by its ID, returning the user if found or undefined if not found
    // // // //  this method is important for fetching individual users and handling cases where the user may not exist in the database

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    // here we define the getByEmail method to retrieve a specific user by their email, returning the user if found or undefined if not found
    // // // // //  this method is crucial for authentication processes where users log in using their email addresses

    getByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    // here we define the create method to add a new user to the database, returning the ID of the newly created user
    // // // // //  this method is essential for allowing users to register and manage their accounts

    create: async (user) => {
        const { name, email, password, role_id } = user;
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
            [name, email, password, role_id || 2]
        );
        return result.insertId;
    },

    // here we define the update method to modify an existing user in the database, returning true if the update was successful
    // // // // //  this method allows users to change their details and ensures that the database reflects these changes accurately

    update: async (id, user) => {
        const { name, email, password, role_id } = user;
        let query = 'UPDATE users SET name = ?, email = ?';
        let params = [name, email];

        if (password) {
            query += ', password = ?';
            params.push(password);
        }

        if (role_id) {
            query += ', role_id = ?';
            params.push(role_id);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);
        return true;
    },

    // here we define the delete method to remove a user from the database by its ID, returning true if the deletion was successful
    // // // // //  this method is crucial for allowing users to manage their accounts and remove accounts they no longer wish to keep

    delete: async (id) => {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }
};

// here we export the User model to be used in other parts of the application, allowing us to keep our code organized and modular
// // // // //  this also makes it easier to maintain and test individual components of our user management system

module.exports = User;
