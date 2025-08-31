const pool = require('./db');

const Product = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (product) => {
        const { name, description, price, stock } = product;
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description, price, stock]
        );
        return result.insertId;
    },

    update: async (id, product) => {
        const { name, description, price, stock } = product;
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name, description, price, stock, id]
        );
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return true;
    }
};

module.exports = Product;
