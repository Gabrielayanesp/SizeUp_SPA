 // auth.controller.js
const login = (req, res) => {
     // Logic for user login
    res.status(200).json({ message: 'Ruta de login' });
};

const register = (req, res) => {
    // Logic for user registration
    res.send('Ruta de registro');
};

const logout = (req, res) => {
    // Logic for logging out
    res.send('Ruta de logout');
};

module.exports = {
    login,
    register,
    logout
};