//Require Packages 
const mysql = require('mysql'), 
    inquirer = require('inquirer'),
    colors = require('colors')
;

//establish connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "VMGJ7B!X",
    database: "Bamazon"
})    

function start(){
    //Starts the Welcome Inquirer Function
    connection.query('SELECT * FROM Inventory', function(err, res){
        if(err) throw err;

        
        console.log('╔═══════════════════════════════════════════════════════════════════════════════════════════════════╗'.blue)
        console.log('                                        Welcome to Bamazon!                                          '.green)
        console.log('╚═══════════════════════════════════════════════════════════════════════════════════════════════════╝'.blue)
        console.log('___________________________________________________________________________________________________'.magenta)
        console.log(' ')
    
        for(var i = 0; i<res.length;i++){
        console.log("ID: ".green + res[i].ItemID + " | " + "Product: ".green + res[i].ItemName + " | " + "Department: ".green + res[i].DepartmentName + " | " + "Price: ".green + res[i].Price + " | " + "QTY: ".green + res[i].Stock);
        console.log('___________________________________________________________________________________________________'.magenta)
        console.log(' ')
        }
    
        inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the ID of the product you would like to purchase?".green,
            validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                return true;
            } else{
                return false;
            }
            }
        },
        {
            type: "input",
            name: "qty",
            message: "How much would you like to purchase?".green,
            validate: function(value){
            if(isNaN(value)){
                return false;
            } else{
                return true;
            }
            }
        }
        ]).then(function(ans){
            var whatToBuy = (ans.id)-1;
            var howMuchToBuy = parseInt(ans.qty);
            var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));
    
            //check if quantity is sufficient
                if(res[whatToBuy].Stock >= howMuchToBuy){
                //after purchase, updates quantity in Inventory
                connection.query("UPDATE Inventory SET ? WHERE ?", [
                {Stock: (res[whatToBuy].Stock - howMuchToBuy)},
                {ItemID: ans.id}
                ], function(err, result){
                    if(err) throw err;
                    console.log(colors.green("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in seven (7) to ten (10) business days."));
                    reprompt();
                
                });
    
                connection.query("SELECT * FROM Departments", function(err, deptRes){
                if(err) throw err;
                var index;
                for(var i = 0; i < deptRes.length; i++){
                if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
                    index = i;
                }
                }
                //updates totalSales in departments table
                connection.query("UPDATE Departments SET ? WHERE ?", [
                {TotalSales: deptRes[index].TotalSales + grandTotal},
                {DepartmentName: res[whatToBuy].DepartmentName}
                ], function(err, deptRes){
                    if(err) throw err;
                });
            });
    
            } else{
            console.log("Sorry, there's not enough in stock!");
            reprompt();
            }
            

        })
    })
    };
    
    // asks if they would like to purchase another item
    function reprompt(){
        inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?".green
        }]).then(function(ans){
        if(ans.reply){
            start();
        } else{
            console.log("Thanks! Come again soon!");
        }
        });
    }
    
    start();