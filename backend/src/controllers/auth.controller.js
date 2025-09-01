const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const user = await User.getByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role_id: user.role_id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
        }

        const existingUser = await User.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserId = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: newUserId, email, role_id: 2 }, // Default role customer
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: newUserId,
                name,
                email,
                role_id: 2
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const logout = (req, res) => {
    // Para JWT, el logout se maneja del lado del cliente eliminando el token
    res.json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = {
    login,
    register,
    logout
};
