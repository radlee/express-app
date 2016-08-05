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
var listOfObjects = readAndMakeObjects("./files/Week1.csv");
var arrayOfCategories = getCategories(listOfObjects);
var productNamesAndCategoryNames = getProductNamesAndCategoryNames(arrayOfCategories);

var categoryNamesAndCategoryIds = {};
var categoryNamesAndCategoryIDs = [];

connection.query("SELECT * FROM Categories", function(err, Categories){
  if(err) return console.log(err);

  Categories.forEach(function(item){
    categoryNamesAndCategoryIds[item.Category] = item.id;
    var result = {
      Category : item.Category,
      CategoryID : item.id
    }
    categoryNamesAndCategoryIDs.push(result);
  })
  console.log(categoryNamesAndCategoryIds);

  var theMap ={};
  var productNameAndCategoryID =[];
  var values =[];
  for(var i in productNamesAndCategoryNames){
    for(var j in categoryNamesAndCategoryIds){
      if(productNamesAndCategoryNames[i] == j){
        var result = {
          Product : i,
          CategoryID : categoryNamesAndCategoryIds[j]
        }
        productNameAndCategoryID.push(result);
      }
    }
  }
  console.log(productNameAndCategoryID);

  //Making a list of a LIST ----
  productNameAndCategoryID.forEach(function(item){
    var result = [
      item.Product, item.CategoryID
    ]
    values.push(result);
  });

  connection.query("INSERT INTO Products (Product, CategoryID) VALUES ?", [values], function(err){
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
