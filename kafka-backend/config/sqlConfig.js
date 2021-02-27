const mysql = require('mysql');
const sqlDB = mysql.createConnection({
    connectionLimit: 100,
    host: 'MYSQL URL',
    user: 'user_name',
    port: 3306,
    password: 'password',
    database: 'db_name'
});

sqlDB.connect((err) => {
    if(err){
      console.log(err)
      throw 'Error occured: ' + err;
       
    } else {
        console.log("MYSQL Database Connected")
    }
  });

  module.exports = sqlDB;