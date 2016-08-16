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
//connection.connect()
var mapOfProducts = readAndMakeObjects("./files/Week1.csv");
var arrayOfCategories = getCategories(mapOfProducts);
var productNamesAndCategoryNames = getProductNamesAndCategoryNames(arrayOfCategories);

var productNamesAndProductIDs = [];
connection.query("SELECT * FROM Products", function(err, Products){
    if(err) return console.log(err);

    Products.forEach(function(item){
      var result = {
        Product : item.Product,
        ProductID : item.id
      }
      productNamesAndProductIDs.push(result);
    });

    var salesStats =[];
    productNamesAndCategoryNames.forEach(function(item){
      productNamesAndProductIDs.forEach(function(item2){
        if(item.Product == item2.Product){
          var result = {
            ProductName : item.Product,
            ProductID : item2.ProductID,
            SaleDate : item.Date,
            Quantity : item.Quantity,
            Price : item.Price.replace(/R/g, "")
          }
          salesStats.push(result);
        }
      })
    });
    var checkDuplicates = {};
    var mapOfProductsAndProductID = [];
    salesStats.forEach(function(item){
      if(checkDuplicates[item.ProductName] == undefined){
        checkDuplicates[item.ProductName] = "";
      }
      checkDuplicates[item.ProductName] = item.ProductID;
      mapOfProductsAndProductID.push({
        // ProductName : item.ProductName,
        ProductID : item.ProductID,
        SaleDate : item.SaleDate,
        Quantity : item.Quantity,
        Price : item.Price
      });
    });

    // var mapOfProductsAndProductID = [];
    // for(var key in checkDuplicates){
    //   var result = {
    //     ProductName : key,
    //     ProductID : checkDuplicates[key]
    //   }
    //   mapOfProductsAndProductID.push(result);
    // }

    var values = [];
  mapOfProductsAndProductID.forEach(function(item){
      var result =[
        item.SaleDate, item.Quantity, item.Price, item.ProductID
      ]
      values.push(result)
    });


    connection.query("INSERT INTO Sales (Date, Quantity, Price, ProductID) VALUES ?", [values], function(err){
        if(err) throw err;
      });
      connection.query("SELECT * FROM Sales", function(err, result){
        if(err){
          console.log(err);
          return;
        }
      });
      connection.end();
    });
