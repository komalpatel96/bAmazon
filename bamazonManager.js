var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  // userPurchase();
});

start();
function start() {
  inquirer
    .prompt({
      type: "list",
      message: "Welcome to the Bamazon Marketplace - Manager's Page. \n What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product" ],
      name: "options"
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.options === "View Products for Sale") {
        viewProductsForSale();
      }
      if (answer.options === "View Low Inventory") {
        viewLowInventory();
      }
      if (answer.options === "Add to Inventory") {
        addToInventory();
      }
      if (answer.options === "Add New Product") {
        addNewProduct();
      }
    });
}

viewProductsForSale = function(){

  connection.query('SELECT * FROM products', function(err, data) {
    if (err) throw err;

    console.log('Existing Inventory:\n.................................');


    var infoDiv = '';
    for (var i = 0; i < data.length; i++) {
      infoDiv = '';
      infoDiv += 'Product ID: ' + data[i].id + '  ||  ';
      infoDiv += 'Product Name: ' + data[i].product_name + '  ||  ';
      infoDiv += 'Department: ' + data[i].department_name + '  ||  ';
      infoDiv += 'Price: $' + data[i].price ;
//double quotes do not work
      console.log(infoDiv);
    }
      connection.end();

  })
}


viewLowInventory = function(){
  connection.query('SELECT * FROM products WHERE stock_quantity <= 50', function(err, answer){
    console.log('');
    console.log('Items With Low Inventory');
    console.log("----------------------------------------\n");


    var lowQuantity = '';
    for( var i = 0; i < answer.length; i++){
      lowQuantity = '';
      lowQuantity += 'Product ID: ' + answer[i].id + '\n';
      lowQuantity += 'Product Name: ' + answer[i].product_name + '\n';
      lowQuantity += 'Department: ' + answer[i].department_name + '\n';
      lowQuantity += 'Price: $' + answer[i].price + '\n';
      lowQuantity += 'Stock Quantity: ' + answer[i].stock_quantity + '\n';
      
      console.log(lowQuantity);
    }
      connection.end();

  })
}


addToInventory = function(){
  inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id of the item you would like to add to?"
      },
      {
        name: "stock",
        type: "input",
        message: "How many products would you like to add to the inventory?"
      }
      ])
    .then(function(answer) {

      // when finished prompting, insert a new product into the db with that info
      connection.query('SELECT * FROM products WHERE ?', { id : answer.id }, function(err, response){
          if (err) throw err;

          // console.log(response);

          var newtotal = parseInt(response[0].stock_quantity) + parseInt(answer.stock);

          connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newtotal
              },
              {
                id : answer.id 
              }
            ], 
            function(err, res) {
              if (err) throw err;

              var newInventory = '';
                  for (var i = 0; i < response.length; i++) {
                    newInventory = '';
                    newInventory += 'Product ID: ' + response[i].id + '\n';
                    newInventory += 'Product Name: ' + response[i].product_name + '\n';
                    newInventory += 'Department: ' + response[i].department_name + '\n';
                    newInventory += 'Price: $' + response[i].price + '\n';
                    newInventory += 'Stock Quantity: ' + response[i].stock_quantity + 10;
                  }

              console.log('\n'+ "Your product was added to the inventory!");
              console.log("-----------------------------------------");
              console.log(newInventory);

            connection.end();

            });
      });
    })
  }

addNewProduct = function() {
  // prompt for info about the product being put up for auction
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product you would like to submit?"
      },
      {
        name: "department_name",
        type: "input",
        message: "What department would you like to place your product in?"
      },
      {
        name: "price",
        type: "input",
        message: "What price would you like to list this product at?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many items would you like to put on sale?",

      }
    ])
    .then(function(answer) {

      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department_name,
          price: answer.price,
          stock_quantity: answer.stock_quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was added successfully!");

        connection.end();
        }
      );
    });
}