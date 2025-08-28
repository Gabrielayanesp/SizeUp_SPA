-- ========================================
-- ELIMINAR Y CREAR BASE DE DATOS
-- ========================================
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ecommerce;

-- ========================================
-- TABLA: users
-- ========================================
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  role ENUM('admin','employee','customer') DEFAULT 'customer',
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,NULL,'Maria Almeida','$2b$10$vNPDPAva//83gbyad.lIfuo7buBxwvlOuJgWYdJi7PH/5AZ.h/rrm','user@user.com'),(2,NULL,'Maria','$2b$10$./ejLdYX5K8nKF8C1MdrAOPq5MILYUccGke/AmJqPjxrI0w5uqN/.','admin@assemblerschool.com'),(3,NULL,'Betty Boop','$2b$10$Nf8LdZP/xa0jlVNfP6g5a.Mzsa21KME8l.QHnhCpU4P1ShQTyNnna','betty@boop.com'),(4,NULL,'Maria12','$2b$10$AcLQmQ6RuXSAN.mql0/jre2HCYwvd8Jv1rP3fb2jFteH.v8pwrgS.','admin@assemblerschool.com'),(5,NULL,'Alfred Garcia','$2b$10$fNyGBL3Wkkv1cWXlYePreOh1cHjHIhEGcKXXlrKqrI.SRkgDe2cdW','alfred@garcia.com'),(6,'admin','Jesus Alves','$2b$10$h/kKGgYBj1fsrf1HYLGfeeiwPllq2cja17ichrnjBm9TT8b8WiNBO','admin@admin.com'),(7,'employee','John Talbain','$2b$10$vNPDPAva//83gbyad.lIfuo7buBxwvlOuJgWYdJi7PH/5AZ.h/rrm','employee@employee.com'),(8,NULL,'Guilherme Carra','$2b$10$f0rgUInqHFsrAyfK/vwPtO.psMpygisDA9n9ifQEDofaaf/WKkXzm','gui_gc@hotmail.com');

UNLOCK TABLES;

-- ========================================
-- TABLA: products
-- ========================================
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(200),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `products` WRITE;

-- INSERT INTO `products` VALUES (1,'Chic French-inspired blouse','100% organic cotton, Features delicate ruffle details, puff sleeves, flattering tailored fit, Lightweight and breathable'),(2,'High-waisted tailored trousers','crafted from premium linen blend, Designed with a relaxed fit, subtle pleats, and side pockets for effortless elegance'),(3,'Oversized hoodie','lightweight , Features a cozy fleece lining , dropped shoulders, minimalist embroidered logo.'),(4,'Romantic midi dress','lightweight, flowy chiffon, dropped shoulders, Features a cinched waist, soft ruffle trims. perfect for garden parties, summer dates, or weekend getaways.'),(5,'Elegant floor-length dress','silky satin with a soft sheen, subtle sweetheart neckline, flowing A-line skirt, fitted bodice, A timeless choice, graceful, and unforgettable.'),(6,'Flirty midi skirt','lightweight chiffon with a delicate floral print , subtle pleats, flowy silhouette, moves gracefully , casual weekends, refined, unforgettable, streetwear style.');
INSERT INTO `products` VALUES (1,'Chic French-inspired blouse','100% organic cotton, Features delicate ruffle details, puff sleeves, flattering tailored fit, Lightweight and breathable'),(2,'High-waisted tailored trousers','crafted from premium linen blend, Designed with a relaxed fit, subtle pleats, and side pockets for effortless elegance'),(3,'Oversized hoodie','lightweight,Features a cozy fleece lining, dropped shoulders, minimalist embroidered logo.'),(4,'Romantic midi dress','lightweight, flowy chiffon, dropped shoulders, Features a cinched waist, soft ruffle trims. perfect for garden parties, summer dates, or weekend getaways.'),(5,'Elegant floor-length dress','silky satin with a soft sheen, subtle sweetheart neckline, flowing A-line skirt, fitted bodice, A timeless choice, graceful, and unforgettable.'),(6,'Flirty midi skirt','lightweight chiffon with a delicate floral print,subtle pleats, flowy silhouette, moves gracefully, casual weekends, refined, unforgettable, streetwear style.');

UNLOCK TABLES;


-- ========================================
-- TABLA: product_variants
-- ========================================
DROP TABLE IF EXISTS product_variants;

CREATE TABLE product_variants (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  size ENUM('SMALL','MEDIUM','LARGE') NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY product_id (product_id),
  CONSTRAINT fk_variants_products FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `product_variants` WRITE;

INSERT INTO `product_variants` VALUES (1,'LARGE',10.50,9),(1,'MEDIUM',9.50,7),(1,'SMALL',8.50,3),(2,'LARGE',10.00,4),(2,'MEDIUM',9.25,11),(2,'SMALL',7.10,0),(3,'LARGE',11.00,4),(3,'MEDIUM',9.25,0),(3,'SMALL',6.10,20),(4,'LARGE',11.50,11),(5,'LARGE',9.00,22),(6,'LARGE',10.50,0),(4,'MEDIUM',10.00,22),(5,'MEDIUM',8.00,10),(6,'MEDIUM',9.50,0),(4,'SMALL',9.50,8),(5,'SMALL',7.00,3),(6,'SMALL',7.50,7);

UNLOCK TABLES;


-- ========================================
-- TABLA: orders
-- ========================================
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY customer_id (customer_id),
  CONSTRAINT fk_orders_users FOREIGN KEY (customer_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `orders` WRITE;

INSERT INTO `orders` VALUES (1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),(22,2),(23,2),(24,2),(25,2),(26,2),(27,2),(28,2),(29,2),(30,2),(31,2),(32,2),(33,2),(34,2),(35,2),(36,2),(37,2),(38,2),(39,2),(40,2),(41,2),(42,2),(43,2),(44,2),(45,2),(46,2),(47,2),(48,2),(49,2),(50,2),(51,2),(52,2),(53,2),(54,2),(55,2),(56,2),(57,2),(58,2),(59,2),(60,2),(61,2),(62,2),(63,2),(64,2),(65,2),(66,2),(67,2),(68,2),(69,2),(70,8),(71,8),(72,8),(73,8),(74,8),(75,8),(76,8),(77,8),(78,8),(79,8);

UNLOCK TABLES;

-- ========================================
-- TABLA: order_items
-- ========================================
DROP TABLE IF EXISTS order_items;

CREATE TABLE order_items (
  order_id INT NOT NULL,
  product_variants_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (order_id, product_variants_id),
  CONSTRAINT fk_orderitems_orders FOREIGN KEY (order_id) REFERENCES orders (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_orderitems_variants FOREIGN KEY (product_variants_id) REFERENCES product_variants (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `order_items` WRITE;

INSERT INTO `orders_items` VALUES (64,1,3,'LARGE'),(65,1,1,'LARGE'),(65,1,1,'MEDIUM'),(66,1,3,'MEDIUM'),(67,1,1,'MEDIUM'),(68,1,3,'LARGE'),(68,1,3,'MEDIUM'),(69,2,3,'MEDIUM'),(69,1,1,'LARGE'),(70,1,1,'LARGE'),(70,1,2,'MEDIUM'),(70,1,3,'SMALL'),(70,3,4,'LARGE'),(71,1,2,'LARGE'),(71,1,2,'MEDIUM'),(71,3,2,'LARGE'),(71,2,2,'LARGE'),(71,2,2,'MEDIUM'),(71,1,2,'SMALL'),(71,3,1,'SMALL'),(72,2,1,'LARGE'),(73,3,1,'LARGE'),(74,3,1,'LARGE'),(75,3,1,'SMALL'),(76,1,1,'LARGE'),(77,1,1,'LARGE'),(78,1,2,'MEDIUM'),(79,1,2,'LARGE');

UNLOCK TABLES;


-- ========================================
-- TABLA: cart_items
-- ========================================
DROP TABLE IF EXISTS cart_items;

CREATE TABLE cart_items (
  user_id INT NOT NULL,
  product_variants_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, product_variants_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_cart_variants FOREIGN KEY (product_variants_id) REFERENCES product_variants (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `cart_items` WRITE;
INSERT INTO `cart_items` VALUES (8,'[{\"id\": \"1\", \"size\": \"MEDIUM\", \"quantity\": 1}]');
UNLOCK TABLES;
