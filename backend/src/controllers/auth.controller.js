// here we import necessary modules and models to handle authentication logic in our application using bcrypt for password 
// hashing and jwt for token generation and verification

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// here we define the login function to authenticate users, generate a JWT token upon successful login, and handle errors appropriately to ensure a
// smooth user experience and security because we are dealing with sensitive information

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

// here we define the register function to handle new user registrations, ensuring that user data is validated,
//  passwords are hashed securely, and a JWT token is generated for immediate authentication after registration    

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

// here we define the logout function to handle user logout requests. Since we are using JWT for authentication,
// // the logout process is managed on the client side by simply deleting the token. 
// // This function provides a response indicating a successful logout.     


const logout = (req, res) => {
    // Para JWT, el logout se maneja del lado del cliente eliminando el token
    res.json({ message: 'Sesión cerrada exitosamente' });
};

// here we export the functions to be used in our routes, allowing us to keep our code organized and modular
// also making it easier to maintain and test individual components of our authentication system

module.exports = {
    login,
    register,
    logout
};
