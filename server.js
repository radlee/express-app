var fs = require("fs");
var express = require('express');
var exphbs = require("express-handlebars");
var app = express();

var readAndMakeObjects = require("./Modules/readAndMakeObjects");
var getMostPopularProduct = require("./Modules/getMostPopularProduct");
var getLeastPopularProduct = require("./Modules/getLeastPopularProduct");
var getMostPopularCategory = require("./Modules/getMostPopularCategory");
var getLeastPopularCategory = require("./Modules/getLeastPopularCategory");
var getMostProfitableCategory = require("./Modules/getMostProfitableCategory");
var getMostProfitableProduct = require("./Modules/getMostProfitableProduct");
var getArrayOfItemsAndProfits = require("./Modules/getArrayOfItemsAndProfits");
var getCategories = require("./Modules/getCategories");
var getSales = require("./Modules/getSales");
var getCosts = require("./Modules/getCosts");



var weeklyStats = function(weekPath, purchasesPath){
  var listOfObjects = readAndMakeObjects(weekPath);
  // Weekly Sales and Weekly Purchases Lists Of Objects ----
  var objArray1 = getSales(weekPath);
  var objArray2 = getCosts(purchasesPath);
  var arrayOfProfits = getArrayOfItemsAndProfits(objArray1, objArray2);
  var mostPopularCategory = getMostPopularCategory(listOfObjects);
  var mostPopularProduct = getMostPopularProduct(listOfObjects);
  var leastPopularProduct = getLeastPopularProduct(listOfObjects);
  var leastPopularCategory = getLeastPopularCategory(listOfObjects);
  var mostProfitableProduct = getMostProfitableProduct(objArray1, objArray2);
  var mostProfitableCategory = getMostProfitableCategory(arrayOfProfits);

  return [mostPopularProduct, leastPopularProduct, mostPopularCategory, leastPopularCategory, mostProfitableProduct, mostProfitableCategory];
}



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// create a route
app.get('/', function(req, res){
    res.render( "home")
});
app.get('/sales/:week_name', function(req, res){
  var weekname = req.params.week_name;
  var weeklyFile = "./files/"  + weekname +".csv";
  var data = weeklyStats(weeklyFile, "./files/purchases.csv");
    res.render( "weeklyStats", {key : data , week : weekname});
});
//start the server
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
 var host = server.address().address;
 var port = server.address().port;
 console.log('App listening at http://%s:%s', host, port);
});
// Connecting Sequel ----------------------------------------------------------
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});
connection.connect();
var sql = "INSERT INTO Categories (Category) VALUES ?";
var Categories =[
  ["Dairy"],
  ["Fruits"],
  ["Food"],
  ["Gifts"],
  ["Candy"],
  ["CoolDrink"],
  ["Beauty"],
  ["Bakery"]
];
connection.query(sql, [Categories], function(err){
  if(err) throw err;
});


connection.query("SELECT * FROM Categories", function(err, Categories){
  if(err) return console.log(err);
  //Populate Products ---------------------------------------------------------
  var listOfObjects = readAndMakeObjects("./files/Week1.csv");
  var arrayOfCategories = getCategories(listOfObjects);
  var productNamesAndCategoryNames ={};
  arrayOfCategories.forEach(function(item){
    if(item.Item == "Amasi"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Milk 1l"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Cream Soda 500ml"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Bananas - loose"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Soap Bar"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Shampoo 1 litre"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Mixed Sweets 5s"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Top Class Soy Mince"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Apples - loose"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Chakalaka Can"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Gold Dish Vegetable Curry Can"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Iwisa Pap 5kg"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Coke 500ml"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Fanta 500ml"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Heart Chocolates"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Valentine Cards"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Rose (plastic)"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
    if(item.Item == "Bread"){
     productNamesAndCategoryNames[item.Item] = item.Category;
    }
  })
  console.log(productNamesAndCategoryNames);

  var categoryNamesAndCategoryIds = {};
  var categoryNamesAndCategoryIDs = [];
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
  })
  var sql2 = "INSERT INTO Products (Product, CategoryID) VALUES ?";
  connection.query(sql2, [values], function(err){
    if(err) throw err;
  });
  var query = connection.query("SELECT * FROM Products", function(err, result){
    if(err){
      console.log(err);
      return;
    }
  });
  console.log(values);

  connection.end();


});




// connection.query(sql, [values], function(err){
//   if(err) throw err;
//   connection.end();
// });



//
// var query = connection.query("SELECT * FROM Categories", function(err, result){
//   if(err){
//     console.log(err);
//     return;
//   }
//   console.log(result);
// });
// https://www.sitepoint.com/using-node-mysql-javascript-client/
