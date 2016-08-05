USE Nelisa;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Sales;
-- SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE Categories(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Category char(100) NOT NULL
);

CREATE TABLE Products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Date char(50) NOT NULL,
  Product char(100) NOT NULL,
  Quantity INT,
  Price char(20) NOT NULL,
  CategoryID INT,
  FOREIGN KEY (CategoryID) REFERENCES Categories (id)
);

CREATE TABLE Sales(
  id INT PRIMARY KEY AUTO_INCREMENT,
  SaleDate char(50) NOT NULL,
  ProductName char(100) NOT NULL,
  Quantity INT,
  Price char(20) NOT NULL,
  ProductID INT,
  FOREIGN KEY (ProductID) REFERENCES Products (id)
);
