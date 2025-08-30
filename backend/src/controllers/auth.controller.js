 // auth.controller.js
const login = (req, res) => {
    // Lógica para el inicio de sesión
    res.status(200).json({ message: 'Ruta de login' });
};

const register = (req, res) => {
    // Lógica para el registro de usuario
    res.send('Ruta de registro');
};

const logout = (req, res) => {
    // Lógica para cerrar sesión
    res.send('Ruta de logout');
};

module.exports = {
    login,
    register,
    logout
};