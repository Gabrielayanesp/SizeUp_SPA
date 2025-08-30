const pool = require('./db');

const OrderItem = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM order_items');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM order_items WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (orderItem) => {
        const { order_id, product_id, quantity, price } = orderItem;
        const [result] = await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [order_id, product_id, quantity, price]
        );
        return result.insertId;
    },

    update: async (id, orderItem) => {
        const { order_id, product_id, quantity, price } = orderItem;
        await pool.query(
            'UPDATE order_items SET order_id = ?, product_id = ?, quantity = ?, price = ? WHERE id = ?',
            [order_id, product_id, quantity, price, id]
        );
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM order_items WHERE id = ?', [id]);
        return true;
    }
};

module.exports = OrderItem;
