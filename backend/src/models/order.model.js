const pool = require('./db');

const Order = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM orders');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (order) => {
        const { user_id, total_amount, status } = order;
        const [result] = await pool.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
            [user_id, total_amount, status || 'pending']
        );
        return result.insertId;
    },

    update: async (id, order) => {
        const { user_id, total_amount, status } = order;
        await pool.query(
            'UPDATE orders SET user_id = ?, total_amount = ?, status = ? WHERE id = ?',
            [user_id, total_amount, status, id]
        );
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM orders WHERE id = ?', [id]);
        return true;
    }
};

module.exports = Order;
