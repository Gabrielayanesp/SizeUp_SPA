// here we import the database connection pool to interact with the MySQL database
// // //  allows for efficient management of database connections in a Node.js application

const pool = require('./db');

// here we define the Product model that contains methods for performing CRUD operations on the products table in the database
// // //  each method interacts with the database using SQL queries and returns the results or performs the necessary actions  

const Product = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    },

    // here we define the getById method to retrieve a specific product by its ID, returning the product if found or undefined if not found
    // // //  this method is important for fetching individual products and handling cases where the product may not exist in the database

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    // here we define the create method to add a new product to the database, returning the ID of the newly created product
    // // //  this method is essential for allowing users to add new products to the inventory and manage product listings

    create: async (product) => {
        const { name, description, price, stock } = product;
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description, price, stock]
        );
        return result.insertId;
    },

    // here we define the update method to modify an existing product in the database, returning true if the update was successful
    // // //  this method allows users to change product details and ensures that the database reflects these changes accurately

    update: async (id, product) => {
        const { name, description, price, stock } = product;
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name, description, price, stock, id]
        );
        return true;
    },

    // here we define the delete method to remove a product from the database by its ID, returning true if the deletion was successful
    // // //  this method is crucial for allowing users to manage their product listings and remove products they no longer wish to keep

    delete: async (id) => {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return true;
    }
};

// here we export the Product model to be used in other parts of the application, allowing us to keep our code organized and modular
// // //  this also makes it easier to maintain and test individual components of our product management system

module.exports = Product;
