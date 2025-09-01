
// here we import the jsonwebtoken library to handle JWT token verification and decoding 
const jwt = require('jsonwebtoken');

// here we define the authMiddleware object that contains middleware functions for verifying JWT tokens and handling optional authentication
// // //  these middleware functions ensure that protected routes are accessed only by authenticated users while allowing flexibility for routes that can be accessed with or without authentication   
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
// here we define the optionalAuth middleware function to allow routes to be accessed with or without a valid JWT token
// // // //  if a valid token is provided, the user information is attached to the request object; otherwise, the request proceeds without user data   
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

// here we export the authMiddleware object to be used in our routes, allowing us to protect specific
//  endpoints and manage authentication seamlessly across the application    

module.exports = authMiddleware; 