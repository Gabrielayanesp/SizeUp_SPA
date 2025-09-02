// here we import the database connection pool to interact with the MySQL database

const pool = require('./db');
// here we define the CartItem model that contains methods for performing CRUD operations on the cart_items table in the database
//  each method interacts with the database using SQL queries and returns the results or performs the necessary actions 

const CartItem = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM cart_items');
        return rows;
    },

    // here we define the getById method to retrieve a specific cart item by its ID, returning the item if found or undefined if not found
    // //  this method is important for fetching individual cart items and handling cases where the item may not exist in the database

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM cart_items WHERE id = ?', [id]);
        return rows[0];
    },
    // here we define the create method to add a new cart item to the database, returning the ID of the newly created item
    // //  this method is essential for allowing users to add items to their shopping cart and manage their selections  

    create: async (item) => {
        const { user_id, product_id, quantity } = item;
        const [result] = await pool.query(
            'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [user_id, product_id, quantity]
        );
        return result.insertId;
    },

    // here we define the update method to modify an existing cart item in the database, returning true if the update was successful
    // //  this method allows users to change the quantity of items in their cart and ensures that the database reflects these changes accurately

    update: async (id, item) => {
        const { quantity } = item;
        await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);
        return true;
    },

    // here we define the delete method to remove a cart item from the database by its ID, returning true if the deletion was successful
    // //  this method is crucial for allowing users to manage their cart contents and remove items they no longer wish to purchase

    delete: async (id) => {
        await pool.query('DELETE FROM cart_items WHERE id = ?', [id]);
        return true;
    }
};

// here we export the CartItem model to be used in other parts of the application, allowing us to keep our code organized and modular
// //  this also makes it easier to maintain and test individual components of our cart item management system 

module.exports = CartItem;
