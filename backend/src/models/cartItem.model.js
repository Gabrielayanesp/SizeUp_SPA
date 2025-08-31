const pool = require('./db');

const CartItem = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM cart_items');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM cart_items WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (item) => {
        const { user_id, product_id, quantity } = item;
        const [result] = await pool.query(
            'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
            [user_id, product_id, quantity]
        );
        return result.insertId;
    },

    update: async (id, item) => {
        const { quantity } = item;
        await pool.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM cart_items WHERE id = ?', [id]);
        return true;
    }
};

module.exports = CartItem;
