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

INSERT INTO Inventory(ItemName,DepartmentName,Price,StockQuantity)
VALUES ("Item Name","Department Name",99.99,10);

CREATE TABLE Departments(
    DepartmentID INT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES ('Department', 99.99, 999999.99);
