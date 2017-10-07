DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE table products(
	id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (100) NOT NULL,
 	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch Band", "Cell Phones & Accessories", 12.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Humidifier", "Appliances", 31.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Make-up Brush", "Beauty & Personal Care", 14.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oven mitts", "Appliances", 9.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GoPro HERO5", "Electronics", 399.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP LaserJet Printer", "Office Products", 149.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Fire Tablet", "Electronics", 149.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stapler", "Office Products", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 8 Phone Case", "Cell Phones & Accessories", 11.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hiking Boots", "Shoes", 129.99, 70);

SELECT * FROM products;
