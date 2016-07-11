var express = require('express');
var fs = require("fs");
var exphbs = require("express-handlebars");
var handlebars = require('handlebars');
var app = express();

var readAndMakeObjects = require("./Modules/readAndMakeObjects");
var getMostPopularProduct = require("./Modules/getMostPopularProduct");
var getLeastPopularProduct = require("./Modules/getLeastPopularProduct");
var getMostPopularCategory = require("./Modules/getMostPopularCategory");
var getLeastPopularCategory = require("./Modules/getLeastPopularCategory");
var getMostProfitableCategory = require("./Modules/getMostProfitableCategory");
var getMostProfitableProduct = require("./Modules/getMostProfitableProduct");
var getArrayOfItemsAndProfits = require("./Modules/getArrayOfItemsAndProfits");
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
