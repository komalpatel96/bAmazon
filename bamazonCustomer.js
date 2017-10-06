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

function userPurchase() {
  // console.log("USER INPUT: ");

  // Prompt the user to select an product
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the product ID which you would like to purchase?',
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many products would you like to purchase?',
      filter: Number
    }
  ]).then(function(answer) {
    // console.log('Customer has selected: \n    id = '  + input.id + '\n    quantity = ' + input.quantity);

    var product = answer.id;
    var quantity = answer.quantity;

    // Query db to confirm that the given product ID exists in the desired quantity
    var queryURL = 'SELECT * FROM products WHERE ?';

    connection.query(queryURL, {id: product}, function(err, data) {
      if (err) throw err;
      //if selects product id 0
      if (data.length === 0) {
        console.log('YOU HAVE ENTERED AN INVALID ID. Please select a valid product ID.');
        displayInventory();

      } else {
        var productInfo = data[0];

        // console.log('productInfo = ' + JSON.stringify(productInfo));
        if (quantity <= productInfo.stock_quantity) {
          console.log('Congratulations, the product you selected is in stock and your order has been placed');

          var newQueryURL = 'UPDATE products SET stock_quantity = ' 
          + (productInfo.stock_quantity - quantity) + ' WHERE id = ' + product;
          // console.log('newQueryURL = ' + newQueryURL);

          // Update the inventory
          connection.query(newQueryURL, function(err, data) {
            if (err) throw err;

            console.log('Your oder has been placed! Your total is $' + productInfo.price * quantity);
            console.log('Thank you for shopping with us!');
            console.log("\n---------------------------------------------------------------------\n");

            // End the database connection
          })
        } else {
          console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
          console.log('Please modify your order.');
          console.log("\n---------------------------------------------------------------------\n");

          displayInventory();
        }
      }
    })
  })
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
  // console.log('___ENTER displayInventory___');

  // Construct the db query string
  QueryURL = 'SELECT * FROM products';

  // Make the db query
  connection.query(QueryURL, function(err, data) {
    if (err) throw err;

    console.log('\n Existing Inventory:\n...............................................');


    var infoDiv = '';
    for (var i = 0; i < data.length; i++) {
      infoDiv = '';
      infoDiv += 'Product ID: ' + data[i].id + '  ||  ';
      infoDiv += 'Product Name: ' + data[i].product_name + '  ||  ';
      infoDiv += 'Department: ' + data[i].department_name + '  ||  ';
      infoDiv += 'Price: $' + data[i].price + '\n';
//double quotes do not work
      console.log(infoDiv);
    }

      console.log("---------------------------------------------------------------------\n");

      //Prompt the user for product/quantity they would like to purchase
      userPurchase();

  })
}

// runBamazon will execute the main application logic
function runBamazon() {
  // console.log('___ENTER runBamazon___');

  // Display the available inventory
  displayInventory();
}

// Run the application logic
runBamazon();