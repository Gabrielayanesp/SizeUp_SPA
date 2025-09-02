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
        const { name, email, password, role_id } = user;
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
            [name, email, password, role_id || 2]
        );
        return result.insertId;
    },

    update: async (id, user) => {
        const { name, email, password, role_id } = user;
        let query = 'UPDATE users SET name = ?, email = ?';
        let params = [name, email];

        if (password) {
            query += ', password = ?';
            params.push(password);
        }

        if (role_id) {
            query += ', role_id = ?';
            params.push(role_id);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.query(query, params);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }
};

module.exports = User;
