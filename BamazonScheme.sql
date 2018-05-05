DROP DATABASE Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Inventory(
    ItemID INT AUTO_INCREMENT NOT NULL,
    ItemName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT(10) NOT NULL,
    primary key(ItemID)
);

select * from Inventory;

INSERT INTO Inventory(ItemName,DepartmentName,Price,Stock)
VALUES ("Bioshock Infinite","Video Games",59.99,100),
("Bananas","Food",00.50,20),
("Leather Recliner","Furniture",159.99,50),
("Settlers of Catan","Board Games",39.99,3),
("Melting Clock","Decoration",29.99,37),
("Avengers: Infinity War","Movies",999.99,1000),
("Pikachu Piggy Bank","Miscellaneous",10.00,10),
("Hawkeye: My Life As A Weapon","Comics",9.95,100),
("Moriar Tea Mug","Homegoods",13.99,2),
("Han Solo Jacket","Clothing",519.99,2),
("God of War","Video Games",69.99,100),
("Harry Potter and the Prisoner of Azkaban","Books",59.99,100),
("Infinity Gauntlet","Clothing",1990909000.99,1),
("Groot","Gardening",800.99,2),
("Pumpkin Spice Candle","Homegoods",5.99,1000);

CREATE TABLE Departments(
    DepartmentID INT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Furniture', 5000.00, 10000.00),
('Books', 5000.00, 10000.00),
('Clothing', 5000.00, 500.00),
('Video Games', 5000.00, 1000.00),
('Board Games', 50000.00, 90000.00),
('Decoration', 5000.00, 90000.00),
('Homegoods', 5000.00, 50000.00),
('Movies', 5000.00, 5000.00),
('Gardening', 100000.00, 10000.00);
