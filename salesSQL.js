// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');
var readAndMakeObjects = require("./Modules/readAndMakeObjects");
var getCategories = require("./Modules/getCategories");
var getProductNamesAndCategoryNames = require("./Modules/getProductNamesAndCategoryNames");

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
//A map and a list of Objects -------------------------------------------------
var productNamesAndProductIds = {};
var productNamesAndProductIDs = [];
connection.query("SELECT * FROM Products", function(err, Products){
    if(err) return console.log(err);
    Products.forEach(function(item){
      productNamesAndProductIds[item.Product] = item.id;
      var result = {
        Product : item.Product,
        ProductID : item.id
      }
      productNamesAndProductIDs.push(result);
    });
    // console.log(productNamesAndProductIds);

    var values = [];
    productNamesAndProductIDs.forEach(function(item){
      var result =[
        item.Product, item.ProductID
      ]
      values.push(result)
    });

    console.log(values);

    values = [[ '12/May/2016','Milk 1l', 1, 2, 21.00 ]]

    connection.query("INSERT INTO Sales (SaleDate, ProductName, ProductID, Quantity, Price) VALUES ?", [values], function(err){
        if(err) throw err;
      });
      connection.query("SELECT * FROM Sales", function(err, result){
        if(err){
          console.log(err);
          return;
        }
        // console.log(result);
      });
      connection.end();
    });
