-- CREACIÓN BD --
CREATE DATABASE onHeels;
CREATE USER back WITH PASSWORD '0nh33ls;
GRANT ALL PRIVILEGES ON DATABASE onHeels TO back;

  
-- CREACIÓN TABLAS --
  
-- Tabla de usuarios --
CREATE TABLE users(
id_user SERIAL PRIMARY KEY,
name VARCHAR (100) NOT NULL,
email VARCHAR (150) UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
role VARCHAR (20) NOT NULL,
created_at TIMESTAMP DEFAULT NOW()  
);

-- Tabla de productos --
CREATE TABLE products(
id_product SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock INT NOT NULL DEFAULT 0,
created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de ventas --
CREATE TABLE sales(
id_sales SERIAL PRIMARY KEY,
id_user INT NOT NULL,
id_product INT NOT NULL,
quantity INT NOT NULL,
total DECIMAL(10,2),
created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (id_user) REFERENCES users(id_user),
FOREIGN KEY (id_product) REFERENCES products(id_product)
);
