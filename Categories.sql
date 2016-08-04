USE Nelisa;
DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (id INT, Category VARCHAR(30));
INSERT INTO Categories (id, Category) VALUES (101, 'Dairy');
INSERT INTO Categories (id, Category) VALUES (201, 'CoolDrink');
INSERT INTO Categories (id, Category) VALUES (301, 'Beauty');
INSERT INTO Categories (id, Category) VALUES (401, 'Food');
INSERT INTO Categories (id, Category) VALUES (501, 'Fruits');
INSERT INTO Categories (id, Category) VALUES (601, 'Candy');
INSERT INTO Categories (id, Category) VALUES (701, 'Canned');
INSERT INTO Categories (id, Category) VALUES (801, 'Gifts');
INSERT INTO Categories (id, Category) VALUES (901, 'Bakery');
SELECT * FROM Categories;

-- https://www.sitepoint.com/using-node-mysql-javascript-client/
