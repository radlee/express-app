module.exports = function(arrayOfCats){
  var productNamesAndCategoryNames ={};
  arrayOfCats.forEach(function(item){
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
  return productNamesAndCategoryNames;
}
