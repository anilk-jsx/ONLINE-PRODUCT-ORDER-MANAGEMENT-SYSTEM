DROP DATABASE IF EXISTS oms_db;
CREATE DATABASE oms_db;
USE oms_db;

CREATE TABLE roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  role_id BIGINT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE customer (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  address VARCHAR(255),
  city VARCHAR(80),
  state VARCHAR(80),
  pincode VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT NOT NULL,
  name VARCHAR(140) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  price DECIMAL(12,2) NOT NULL,
  gst_percent DECIMAL(5,2) DEFAULT 18.00,
  stock_qty INT DEFAULT 0,
  sku VARCHAR(80) UNIQUE,
  active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE stock (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT NOT NULL UNIQUE,
  quantity INT NOT NULL DEFAULT 0,
  low_stock_limit INT DEFAULT 5,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE stock_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT NOT NULL,
  change_type ENUM('ADD','REMOVE','ADJUST') NOT NULL,
  quantity INT NOT NULL,
  note VARCHAR(255),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(40) NOT NULL UNIQUE,
  customer_id BIGINT NOT NULL,
  status ENUM('PENDING','CONFIRMED','PACKED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') DEFAULT 'PENDING',
  subtotal DECIMAL(12,2) NOT NULL,
  gst_amount DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  delivery_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  gst_percent DECIMAL(5,2) NOT NULL,
  line_total DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE invoice (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL UNIQUE,
  invoice_number VARCHAR(40) NOT NULL UNIQUE,
  invoice_date DATE NOT NULL,
  pdf_url VARCHAR(255),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE delivery (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL UNIQUE,
  partner_name VARCHAR(120),
  tracking_number VARCHAR(120),
  status VARCHAR(80) DEFAULT 'NOT_ASSIGNED',
  expected_delivery DATE,
  delivered_at TIMESTAMP NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE customer_issue (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  order_id BIGINT,
  subject VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('OPEN','IN_PROGRESS','RESOLVED') DEFAULT 'OPEN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE issue_reply (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  issue_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  reply TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_id) REFERENCES customer_issue(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  title VARCHAR(140) NOT NULL,
  message VARCHAR(255) NOT NULL,
  read_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE whatsapp_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT,
  phone VARCHAR(30) NOT NULL,
  message VARCHAR(500) NOT NULL,
  status VARCHAR(40) DEFAULT 'QUEUED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO roles(name) VALUES ('ADMIN'), ('CUSTOMER');
INSERT INTO users(name,email,password,phone,role_id) VALUES
('Admin User','admin@quickmart.com','admin123','9999999999',1),
('Demo Customer','customer@quickmart.com','customer123','8888888888',2);
INSERT INTO customer(user_id,address,city,state,pincode) VALUES
(2,'MG Road','Bhubaneswar','Odisha','751001');
INSERT INTO category(name,description) VALUES
('Electronics','Daily-use electronic products'),
('Home','Home and kitchen items');
INSERT INTO product(category_id,name,description,image_url,price,gst_percent,stock_qty,sku) VALUES
(1,'Bluetooth Speaker','Portable speaker with deep bass','assets/products/speaker.jpg',1499.00,18.00,20,'SPK-001'),
(2,'Steel Bottle','Insulated water bottle','assets/products/bottle.jpg',599.00,12.00,35,'BTL-001');
INSERT INTO stock(product_id,quantity,low_stock_limit) VALUES (1,20,5),(2,35,8);
