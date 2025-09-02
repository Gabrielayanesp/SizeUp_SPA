// here we import the database connection pool to interact with the MySQL database this setup
// // //  allows for efficient management of database connections in a Node.js application

const pool = require('./db');

// here we define the OrderItem model that contains methods for performing CRUD operations on the order_items table in the database
// // //  each method interacts with the database using SQL queries and returns the results or performs the necessary actions
const OrderItem = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM order_items');
        return rows;
    },

    // here we define the getById method to retrieve a specific order item by its ID, returning the item if found or undefined if not found
    // //  this method is important for fetching individual order items and handling cases where the item may not exist in the database

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM order_items WHERE id = ?', [id]);
        return rows[0];
    },

    // here we define the create method to add a new order item to the database, returning the ID of the newly created item
    // // //  this method is essential for allowing users to add items to their orders and manage their purchases

    create: async (orderItem) => {
        const { order_id, product_id, quantity, price } = orderItem;
        const [result] = await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [order_id, product_id, quantity, price]
        );
        return result.insertId;
    },

    // here we define the update method to modify an existing order item in the database, returning true if the update was successful
    // // //  this method allows users to change order item details and ensures that the database reflects these changes accurately

    update: async (id, orderItem) => {
        const { order_id, product_id, quantity, price } = orderItem;
        await pool.query(
            'UPDATE order_items SET order_id = ?, product_id = ?, quantity = ?, price = ? WHERE id = ?',
            [order_id, product_id, quantity, price, id]
        );
        return true;
    },

    // here we define the delete method to remove an order item from the database by its ID, returning true if the deletion was successful
    // //  this method is crucial for allowing users to manage their order items and remove items they no longer wish to keep
    delete: async (id) => {
        await pool.query('DELETE FROM order_items WHERE id = ?', [id]);
        return true;
    }
};

// here we export the OrderItem model to be used in other parts of the application, allowing us to keep our code organized and modular
// // //  this also makes it easier to maintain and test individual components of our order item management system

module.exports = OrderItem;
