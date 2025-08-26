-- ================================================
-- CREATE DATABASE (ejecuta estas líneas y luego usa la BD)
-- ================================================
CREATE DATABASE IF NOT EXISTS onheels_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE onheels_db;
-- ================================================
-- TABLE: ROLES
-- ================================================
CREATE TABLE roles (
    id_role INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_role),
    UNIQUE KEY uq_roles_name (role_name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ================================================
-- TABLE: USERS
-- ================================================
CREATE TABLE users (
    id_user INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_role INT NOT NULL,
    PRIMARY KEY (id_user),
    UNIQUE KEY uq_users_email (email),
    KEY idx_users_id_role (id_role),
    CONSTRAINT fk_users_roles FOREIGN KEY (id_role) REFERENCES roles (id_role) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ================================================
-- TABLE: STORES
-- ================================================
CREATE TABLE stores (
    id_store INT NOT NULL AUTO_INCREMENT,
    store_name VARCHAR(100) NOT NULL,
    store_description TEXT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    id_seller INT NOT NULL,
    PRIMARY KEY (id_store),
    KEY idx_stores_id_seller (id_seller),
    CONSTRAINT fk_stores_seller FOREIGN KEY (id_seller) REFERENCES users (id_user) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ================================================
-- TABLE: PRODUCTS
-- ================================================
CREATE TABLE products (
    id_product INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_store INT NOT NULL,
    PRIMARY KEY (id_product),
    KEY idx_products_id_store (id_store),
    CONSTRAINT fk_products_store FOREIGN KEY (id_store) REFERENCES stores (id_store) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ================================================
-- TABLE: ORDERS
-- ================================================
CREATE TABLE orders (
    id_order INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_order),
    KEY idx_orders_id_user (id_user),
    CONSTRAINT fk_orders_user FOREIGN KEY (id_user) REFERENCES users (id_user) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ================================================
-- TABLE: ORDER_DETAIL
-- ================================================
CREATE TABLE order_detail (
    id_order_detail INT NOT NULL AUTO_INCREMENT,
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_order_detail),
    KEY idx_orderdetail_id_order (id_order),
    KEY idx_orderdetail_id_product (id_product),
    CONSTRAINT fk_orderdetail_order FOREIGN KEY (id_order) REFERENCES orders (id_order) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_orderdetail_product FOREIGN KEY (id_product) REFERENCES products (id_product) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- ================================================
-- TABLE: FAVORITES
-- ================================================
CREATE TABLE favorites (
    id_favorite INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    PRIMARY KEY (id_favorite),
    UNIQUE KEY uq_favorites_user_product (id_user, id_product),
    KEY idx_favorites_id_user (id_user),
    KEY idx_favorites_id_product (id_product),
    CONSTRAINT fk_favorites_user FOREIGN KEY (id_user) REFERENCES users (id_user) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_favorites_product FOREIGN KEY (id_product) REFERENCES products (id_product) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
