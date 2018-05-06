# Bamazon

## Overview
Created a Node.js application run in the command line called "Bamazon", which uses a MySQL database to store and pull inventory. There are three different modes in which to utilize the app:

  * `Customer Mode`

  * `Manager Mode`

  * `Supervisor Mode`

## Getting Started
To View this App on your own computer, first do the following: 
- Clone this repo onto your computer
- Run command 'npm install' in Terminal or GitBash
- Run one of the commands below.

## What Each Command Does

1. `BamazonCustomer`
This displays all available inventory in the store, followed by options allowed a customer to select a product and the quantity they'd like to order. The application then displays a summary of their purchase, the total cost, and the estimated delivery time. If the user attempts to order more quantity than available in stock, it will display a notice refusing the transaction.

Sample GIF: https://drive.google.com/file/d/1yi7LanINKXlzyJtcFZtMAAkjVir-71o9/view

Sample GIF 2: https://drive.google.com/file/d/1omVEXMeS5xEIPHVBiYbu5XpltbQSlcPP/view


2. `BamazonManager`
This displays a menu for manager use, with the following options: 

  * View Products for Sale
    * Displays list of items for sale

  * View Low Inventory
    * Displays products with a low quantity 

  * Add New Product
    * Adds new product to inventory

  * End Session
    * Terminates the session

Sample GIF: https://drive.google.com/file/d/1WWeW9ySogfpvr4S-tN_Lw8h60avvLA0A/view


3. `BamazonSupervisor`

  * View Product Sales by Department
    * Displays products for supervisor based on their Department

  * Create New Department
    * Allows the supervisor to create a new Department

  * End Session
    * Terminates the session

Sample GIF: https://drive.google.com/file/d/1ZETDwS4oprJyewM8n9aKmjxJrfRlBUDr/view


## Node Packages Used
- Node.js
- Colors NPM Package - https://www.npmjs.com/package/colors
- Inquire NPM Package - https://www.npmjs.com/package/inquirer

## Prerequisites
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```

## Built With

* Visual Studio Code

## Authors

* **Jessica Giampietro** - *Node JS* - [Jessica Giampietro](https://github.com/giampietrojess)