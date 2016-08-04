
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "Leander247365",
  database : "Nelisa"
});

connection.connect();


var id = '1; drop table article;';

connection.query('select * from article where id = ?', id, function(err, result){
  if(err){
    console.log(err);
    return;
  }
  console.log(result);

})
