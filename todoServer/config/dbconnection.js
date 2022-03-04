const mysql = require('mysql');

const dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

dbconnection.connect((err) => {
    if(err){
        console.warn(err);
    } 
});

module.exports = dbconnection;