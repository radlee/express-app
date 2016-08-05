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
// connection.connect();
var mapOfProducts = readAndMakeObjects("./files/Week1.csv");
var arrayOfCategories = getCategories(mapOfProducts);
var productNamesAndCategoryNames = getProductNamesAndCategoryNames(arrayOfCategories);

var categoryNamesAndCategoryIDs = [];
connection.query("SELECT * FROM Categories", function(err, Categories){
  if(err) return console.log(err);

  Categories.forEach(function(item){
    var result = {
      Category : item.Category,
      CategoryID : item.id
    }
    categoryNamesAndCategoryIDs.push(result);
  })

  var productNameAndCategoryID =[];
  productNamesAndCategoryNames.forEach(function(item){
    categoryNamesAndCategoryIDs.forEach(function(item2){
      if(item.Category == item2.Category){
        var result = {
          Product : item.Product,
          CategoryID : item2.CategoryID,
          Date : item.Date,
          Quantity : item.Quantity,
          Price : item.Price
        }
        productNameAndCategoryID.push(result);
      }
    })
  });

  var values =[];
  //Making a list of a LIST ----
  productNameAndCategoryID.forEach(function(item){
    var result = [
      item.Date, item.Product, item.Quantity, item.Price, item.CategoryID
    ]
    values.push(result);
  })

  connection.query("INSERT INTO Products (Date, Product, Quantity, Price, CategoryID) VALUES ?", [values], function(err){
    if(err) throw err;
  });

  connection.query("SELECT * FROM Products", function(err, result){
    if(err){
      console.log(err);
      return;
    }
    // console.log(result);
  });
  connection.end();

});
