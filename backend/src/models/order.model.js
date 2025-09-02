// here we import the database connection pool to interact with the MySQL database this setup
// //  allows for efficient management of database connections in a Node.js application

const pool = require('./db');

// here we define the Order model that contains methods for performing CRUD operations on the orders table in the database
// //  each method interacts with the database using SQL queries and returns the results or performs the necessary actions 

const Order = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM orders');
        return rows;
    },

    // here we define the getById method to retrieve a specific order by its ID, returning the order if found or undefined if not found
    // // //  this method is important for fetching individual orders and handling cases where the order may not exist in the database

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    },

    // here we define the create method to add a new order to the database, returning the ID of the newly created order
    // // //  this method is essential for allowing users to place orders and manage their purchases

    create: async (order) => {
        const { user_id, total_amount, status } = order;
        const [result] = await pool.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
            [user_id, total_amount, status || 'pending']
        );
        return result.insertId;
    },

    // here we define the update method to modify an existing order in the database, returning true if the update was successful
    // //  this method allows users to change order details and ensures that the database reflects these changes accurately

    update: async (id, order) => {
        const { user_id, total_amount, status } = order;
        await pool.query(
            'UPDATE orders SET user_id = ?, total_amount = ?, status = ? WHERE id = ?',
            [user_id, total_amount, status, id]
        );
        return true;
    },

    // here we define the delete method to remove an order from the database by its ID, returning true if the deletion was successful
    // //  this method is crucial for allowing users to manage their orders and remove orders they no longer wish to keep   
    delete: async (id) => {
        await pool.query('DELETE FROM orders WHERE id = ?', [id]);
        return true;
    }
};
// here we export the Order model to be used in other parts of the application, allowing us to keep our code organized and modular
// //  this also makes it easier to maintain and test individual components of our order management system  

module.exports = Order;
