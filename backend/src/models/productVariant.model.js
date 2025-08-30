const pool = require('./db');

const ProductVariant = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM product_variants');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM product_variants WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (variant) => {
        const { product_id, name, value, price, stock } = variant;
        const [result] = await pool.query(
            'INSERT INTO product_variants (product_id, name, value, price, stock) VALUES (?, ?, ?, ?, ?)',
            [product_id, name, value, price, stock]
        );
        return result.insertId;
    },

    update: async (id, variant) => {
        const { product_id, name, value, price, stock } = variant;
        await pool.query(
            'UPDATE product_variants SET product_id = ?, name = ?, value = ?, price = ?, stock = ? WHERE id = ?',
            [product_id, name, value, price, stock, id]
        );
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM product_variants WHERE id = ?', [id]);
        return true;
    }
};

module.exports = ProductVariant;
