const mysql = require('mysql');
const {dbUser, dbPass, dbName} = require('./config');

const db = mysql.createConnection({
    host     : 'localhost',
	user     : DB_USER,
	password : DB_PASSWORD,
    database : DB_NAME,
	multipleStatements: true
});

db.connect((err) =>{
    if(err){
        throw err;
    } 
    console.log('Connected to Database');
});

module.exports = db;