const pool = require('./db');

const User = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    getByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    create: async (user) => {
        const { name, email, password } = user;
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return result.insertId;
    },

    update: async (id, user) => {
        const { name, email, password } = user;
        await pool.query(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }
};

module.exports = User;
