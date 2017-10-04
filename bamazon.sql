DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE DATABASE bamazon;

CREATE table products(
	id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (20) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER NOT NULL

)