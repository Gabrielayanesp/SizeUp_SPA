// here we import the mysql2 library to create a connection pool for interacting with the MySQL database this setup
//  allows for efficient management of database connections in a Node.js application

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// here we export the pool object to be used in other parts of the application, allowing us to perform database operations
// // //  this also makes it easier to maintain and test the database connection setup separately from other components
module.exports = pool;