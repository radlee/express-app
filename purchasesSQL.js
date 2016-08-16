var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});

var data = fs.readFileSync("./files/purchases.csv", 'utf8');
var listOfSplittedLines = data.split("\n").splice(1).filter(Boolean);

var list =[];
var listOfObjs = [];
listOfSplittedLines.forEach(function(line){
  var splittedLine = line.split(";");
  list.push(splittedLine);
  var quantity = splittedLine[3];
  var costPerItem  = splittedLine[4].replace(/R/g, "");
  var totalCost = splittedLine[5].replace(/R/g, "");
  var costPerItem  = costPerItem.replace(",", ".");
  var totalCost = totalCost.replace(",", ".");
  var result = {
    Shop : splittedLine[0],
    Date : splittedLine[1],
    Item : splittedLine[2],
    Quantity : quantity,
    CostPerItem : costPerItem,
    TotalCost : totalCost
  }
  listOfObjs.push(result);
})

var productNamesAndProductIDs = [];
connection.query("SELECT * FROM Products", function(err, Products){
  if(err) return console.log(err);

  Products.forEach(function(item){
    var result = {
      Product : item.Product,
      ProductID : item.id
    }
    productNamesAndProductIDs.push(result);
  })

  var purchasesStats =[];
  listOfObjs.forEach(function(item){
    productNamesAndProductIDs.forEach(function(item2){
      if(item.Item == item2.Product){
        var result = {
          Shop : item.Shop,
          Product : item2.Product,
          ProductID : item2.ProductID,
          Date : item.Date,
          Quantity : item.Quantity,
          CostPerItem : item.CostPerItem,
          TotalCost : item.TotalCost
        }
       purchasesStats.push(result);
      }
    })
  });
  var values =[];
  //Making a list of a LIST ----
  purchasesStats.forEach(function(item){
    var result = [
      item.Shop, item.Date, item.Quantity, item.CostPerItem, item.TotalCost, item.ProductID
    ]
    values.push(result);
  })

  connection.query("INSERT INTO Purchases (Shop, Date, Quantity, CostPerItem, TotalCost, ProductID) VALUES ?", [values], function(err){
    if(err) throw err;
  });

  connection.query("SELECT * FROM Purchases", function(err, result){
    if(err){
      console.log(err);
      return;
    }
  });
  connection.end();
});
