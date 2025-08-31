const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token de acceso requerido' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    },

    optionalAuth: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
                req.user = decoded;
            } catch (error) {
                // Token inválido, pero continuamos sin usuario
            }
        }
        
        next();
    }
};

module.exports = authMiddleware; 