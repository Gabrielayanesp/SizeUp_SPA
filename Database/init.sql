-- ================================================
-- CREATING TABLES FOR THE STORE MODEL
-- ================================================

CREATE DATABASE onHeels_db;
USE onHeels_db;

-- ================================================
-- TABLE: ROLES
-- ================================================
CREATE TABLE roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ================================================
-- TABLE: USERS
-- ================================================
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_role INT NOT NULL,
    CONSTRAINT fk_users_roles FOREIGN KEY (id_role)
        REFERENCES roles(id_role)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ================================================
-- TABLE: STORES
-- A seller (a user with role "seller") can have multiple stores.
-- ================================================
CREATE TABLE stores (
    id_store INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(100) NOT NULL,
    store_description TEXT NULL,
    address varchar(255) not null,
    city varchar(100) not null,
    country varchar(100) not null,
    id_seller INT NOT NULL,
    CONSTRAINT fk_stores_seller FOREIGN KEY (id_seller)
        REFERENCES users(id_user)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ================================================
-- TABLE: PRODUCTS
-- Each product belongs to a store.
-- ================================================
CREATE TABLE products (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    id_store INT NOT NULL,
    CONSTRAINT fk_products_store FOREIGN KEY (id_store)
        REFERENCES stores(id_store)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ================================================
-- TABLE: ORDERS
-- Each order belongs to a user (customer).
-- ================================================
CREATE TABLE orders (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (id_user)
        REFERENCES users(id_user)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ================================================
-- TABLE: ORDER_DETAIL
-- Many-to-Many relationship between orders and products.
-- ================================================
CREATE TABLE order_detail (
    id_order_detail INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_orderdetail_order FOREIGN KEY (id_order)
        REFERENCES orders(id_order)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_orderdetail_product FOREIGN KEY (id_product)
        REFERENCES products(id_product)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ================================================
-- TABLE: FAVORITES
-- Many-to-Many relationship between users and products.
-- ================================================
CREATE TABLE favorites (
    id_favorite INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    CONSTRAINT fk_favorites_user FOREIGN KEY (id_user)
        REFERENCES users(id_user)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_favorites_product FOREIGN KEY (id_product)
        REFERENCES products(id_product)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT uq_favorites UNIQUE (id_user, id_product)
) ENGINE=InnoDB;


