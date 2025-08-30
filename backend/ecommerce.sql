-- ========================================
-- DROP AND CREATE DATABASE
-- ========================================
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce
  DEFAULT CHARACTER SET utf8mb4;


USE ecommerce;

-- ========================================
-- TABLE: users
-- ========================================
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES
('Jessica Brown', 'jessica.brown@example.com', '$2b$10$tvgkTVHlIQQ92ngDONR2Bu9QOeKUk3.lP4QLs6yuYTIKzEDMTG/T.'),
('Sophia Wilson', 'sophia.wilson@example.com', '$2b$10$tvgkTVHlIQQ92ngDONR2Bu9QOeKUk3.lP4QLs6yuYTIKzEDMTG/T.'),
('Olivia Johnson', 'olivia.johnson@example.com', '$2b$10$tvgkTVHlIQQ92ngDONR2Bu9QOeKUk3.lP4QLs6yuYTIKzEDMTG/T.');


-- ========================================
-- TABLE: roles
-- ========================================
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO roles (name) VALUES
('Admin'),
('Customer');


-- ========================================
-- TABLE: products
-- ========================================
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, stock) VALUES
('Plus Size Floral Dress', 'Elegant floral dress for plus size women, perfect for casual and party wear.', 49.99, 50),
('Curvy Fit Jeans', 'Comfortable plus size jeans with stretchable fabric.', 39.99, 100),
('Oversized T-Shirt', 'Casual oversized t-shirt for a relaxed look.', 19.99, 150);


-- ========================================
-- TABLE: product_variants
-- ========================================
DROP TABLE IF EXISTS product_variants;

CREATE TABLE product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO product_variants (product_id, name, value, price, stock) VALUES
(1, 'Size', 'XL', 49.99, 20),
(1, 'Size', 'XXL', 49.99, 15),
(1, 'Color', 'Red', 49.99, 10),
(1, 'Color', 'Blue', 49.99, 15),
(2, 'Size', '14', 39.99, 30),
(2, 'Size', '16', 39.99, 25),
(2, 'Color', 'Dark Blue', 39.99, 50),
(3, 'Size', 'L', 19.99, 40),
(3, 'Size', 'XL', 19.99, 35),
(3, 'Color', 'White', 19.99, 50),
(3, 'Color', 'Black', 19.99, 50);


-- ========================================
-- TABLE: orders
-- ========================================
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 89.98, 'paid'),
(2, 39.99, 'pending');


-- ========================================
-- TABLE: order_items
-- ========================================
DROP TABLE IF EXISTS order_items;

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 49.99),
(1, 2, 1, 39.99),
(2, 2, 1, 39.99);


-- ========================================
-- TABLE: cart_items
-- ========================================
DROP TABLE IF EXISTS cart_items;

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(3, 1, 2),
(3, 3, 1),
(2, 3, 2);
