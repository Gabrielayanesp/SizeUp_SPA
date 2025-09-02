// here we import the database connection pool to interact with the MySQL database
// //  allows for efficient management of database connections in a Node.js application

const pool = require('./db');

// here we define the ProductVariant model that contains methods for performing CRUD operations on the product_variants table in the database
// // //  each method interacts with the database using SQL queries and returns the results or performs the necessary actions

const ProductVariant = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM product_variants');
        return rows;
    },

    // here we define the getById method to retrieve a specific product variant by its ID, returning the variant if found or undefined if not found
    // // //  this method is important for fetching individual product variants and handling cases where the variant may not exist in the database
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM product_variants WHERE id = ?', [id]);
        return rows[0];
    },

    // here we define the create method to add a new product variant to the database, returning the ID of the newly created variant
    // // // //  this method is essential for allowing users to add new variants to products and manage product options

    create: async (variant) => {
        const { product_id, name, value, price, stock } = variant;
        const [result] = await pool.query(
            'INSERT INTO product_variants (product_id, name, value, price, stock) VALUES (?, ?, ?, ?, ?)',
            [product_id, name, value, price, stock]
        );
        return result.insertId;
    },
    // here we define the update method to modify an existing product variant in the database, returning true if the update was successful
    // // //  this method allows users to change product variant details and ensures that the database reflects these changes accurately

    update: async (id, variant) => {
        const { product_id, name, value, price, stock } = variant;
        await pool.query(
            'UPDATE product_variants SET product_id = ?, name = ?, value = ?, price = ?, stock = ? WHERE id = ?',
            [product_id, name, value, price, stock, id]
        );
        return true;
    },

    // here we define the delete method to remove a product variant from the database by its ID, returning true if the deletion was successful
    // // //  this method is crucial for allowing users to manage their product variants and remove variants they no longer wish to keep

    delete: async (id) => {
        await pool.query('DELETE FROM product_variants WHERE id = ?', [id]);
        return true;
    }
};

// here we export the ProductVariant model to be used in other parts of the application, allowing us to keep our code organized and modular
// // // //  this also makes it easier to maintain and test individual components of our product variant management system

module.exports = ProductVariant;
