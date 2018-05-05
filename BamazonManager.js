//Require Packages 
const mysql = require('mysql'), 
    inquirer = require('inquirer'),
    colors = require('colors');

    //establish connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "VMGJ7B!X",
    database: "Bamazon"
})    

    function start(){
        inquirer.prompt([{
          type: "list",
          name: "doThing",
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
        }]).then(function(ans){
           switch(ans.doThing){
            case "View Products for Sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "End Session": console.log('Bye!');
          }
        });
      }
      
      //views all inventory
      function viewProducts(){
        console.log('╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗'.blue)
        console.log('                                         Viewing Products                                           '.green)
        console.log('╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝'.blue)
        
      
        connection.query('SELECT * FROM Inventory', function(err, res){
        if(err) throw err;
        console.log('___________________________________________________________________________________________________'.magenta)
        console.log(' ')

        for(var i = 0; i<res.length;i++){
          console.log("ID: ".green + res[i].ItemID + " | " + "Product: ".green + res[i].ItemName + " | " + "Department: ".green + res[i].DepartmentName + " | " + "Price: ".green + res[i].Price + " | " + "QTY: ".green + res[i].Stock);
          console.log('___________________________________________________________________________________________________'.magenta)
        }
      
        start();
        });
      }
      
      //views inventory lower than 5
      function viewLowInventory(){
        console.log('╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗'.blue)
        console.log('                                       Viewing Low Inventory                                        '.green)
        console.log('╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝'.blue)
        
      
        connection.query('SELECT * FROM Inventory', function(err, res){
        if(err) throw err;
        console.log('___________________________________________________________________________________________________'.magenta)
        console.log(' ')

        for(var i = 0; i<res.length;i++){
          if(res[i].Stock <= 5){
          console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ItemName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].Stock);
          console.log('___________________________________________________________________________________________________'.magenta)
          }
        }
      
        start();
        });
      }
      
      //displays prompt to add more of an item to the store and asks how much
      function addToInventory(){
        console.log('╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗'.blue)
        console.log('                                       Adding to Inventory                                        '.green)
        console.log('╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝'.blue)
        
      
        connection.query('SELECT * FROM Inventory', function(err, res){
        if(err) throw err;
        var itemArray = [];
        //pushes each item into an itemArray
        for(var i=0; i<res.length; i++){
          itemArray.push(res[i].ProductName);
        }
      
        inquirer.prompt([{
          type: "list",
          name: "product",
          choices: itemArray,
          message: "Which item would you like to add inventory?"
        }, {
          type: "input",
          name: "qty",
          message: "How much would you like to add?",
          validate: function(value){
            if(isNaN(value) === false){return true;}
            else{return false;}
          }
          }]).then(function(ans){
            var currentQty;
            for(var i=0; i<res.length; i++){
              if(res[i].ProductName === ans.product){
                currentQty = res[i].Stock;
              }
            }
            connection.query('UPDATE Inventory SET ? WHERE ?', [
              {Stock: currentQty + parseInt(ans.qty)},
              {ProductName: ans.product}
              ], function(err, res){
                if(err) throw err;
                console.log('The quantity was updated.');
                start();
              });
            })
        });
      }
      
      //allows manager to add a completely new product to store
      function addNewProduct(){
        console.log('╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗'.blue)
        console.log('                                         Adding New Product                                          '.green)
        console.log('╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝'.blue)
        
      
        var deptNames = [];
      
        //grab name of departments
        connection.query('SELECT * FROM Departments', function(err, res){
          if(err) throw err;
          for(var i = 0; i<res.length; i++){
            deptNames.push(res[i].DepartmentName);
          }
        })
      
        inquirer.prompt([{
          type: "input",
          name: "product",
          message: "Product: ",
          validate: function(value){
            if(value){return true;}
            else{return false;}
          }
        }, {
          type: "list",
          name: "department",
          message: "Department: ",
          choices: deptNames
        }, {
          type: "input",
          name: "price",
          message: "Price: ",
          validate: function(value){
            if(isNaN(value) === false){return true;}
            else{return false;}
          }
        }, {
          type: "input",
          name: "quantity",
          message: "Quantity: ",
          validate: function(value){
            if(isNaN(value) == false){return true;}
            else{return false;}
          }
        }]).then(function(ans){
          connection.query('INSERT INTO Inventory SET ?',{
            ProductName: ans.product,
            DepartmentName: ans.department,
            Price: ans.price,
            Stock: ans.quantity
          }, function(err, res){
            if(err) throw err;
            console.log('Another item was added to the store.');
          })
          start();
        });
      }
      
      start();