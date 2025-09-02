// here we set up the main Express server, configure middleware, and define routes for the application
// // // // // // // //  this file serves as the entry point for the backend application, initializing the server and handling requests
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// here we configure middleware for CORS and JSON parsing to handle incoming requests properly
// // // // // // //  this setup ensures that our server can accept requests from different origins and parse JSON payloads effectively
// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas

// here we import route modules for different parts of the application, such as authentication, users, roles, products, orders, order items, product variants, and cart items
// // // // // // // //  this modular approach helps keep the code organized and maintainable by separating concerns into different files

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const orderItemRoutes = require('./routes/orderItem.routes');
const productVariantRoutes = require('./routes/productVariant.routes');
const cartItemRoutes = require('./routes/cartItem.routes');

// Rutas base

// here we set up the base routes for the application, linking each route to its corresponding router module
// // // // // // // //  this allows the server to direct incoming requests to the appropriate handlers based on the URL path

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/cart-items', cartItemRoutes);

// Ruta de prueba
// here we define a simple root route to verify that the API is running
// // // // // // // //  this can be useful for health checks or initial testing of the server setup
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Manejo de rutas no encontradas
// here we handle 404 errors for routes that are not found, sending a JSON response with an appropriate message
// // // // // // //  this ensures that clients receive a clear indication when they attempt to access an undefined route
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Manejo de errores
// here we set up a global error handler to catch and respond to errors that occur during request processing
// // // // // // //  this centralized error handling improves the robustness of the application and provides consistent error responses to clients
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Error de validación de JWT
    // here we check for specific error types, such as JWT validation errors and database errors, to provide more detailed responses
    // // // // // // // //  this helps clients understand the nature of the error and take appropriate action
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido' });
    }
    
    // Error de token expirado
    // here we handle the case where a JWT token has expired, sending a specific response to inform the client
    // // // // // // // //  this allows clients to know when they need to refresh their authentication tokens
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
    }
    
    // Error de base de datos
    // here we handle database errors, such as duplicate entry errors, to provide meaningful feedback to the client
    // // // // // // // //  this helps maintain data integrity and informs clients of issues related to their requests
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Datos duplicados' });
    }
    
    // Error general
    // here we send a generic 500 Internal Server Error response for any other unhandled errors
    // // // // // // //  this ensures that clients are informed of server-side issues without exposing sensitive error details
    res.status(500).json({ 
        message: 'Error interno del servidor', 
        error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

// here we start the server, listening on a specified port and logging a message to indicate that the server is running
// // // // // // //  this is the final step in setting up the backend application, making it ready to handle incoming requests
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // here we log a message to the console indicating that the server is running and on which port
    // // // // // // //  this is useful for debugging and confirming that the server has started successfully
    console.log(`Server running on port ${PORT}`);
});
