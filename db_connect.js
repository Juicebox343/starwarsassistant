mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
	user     : 'root',
	password : 'PorterFridge42',
    database : 'swassist',
	multipleStatements: true
});

db.connect((err) =>{
    if(err){
        throw err;
    } 
    console.log('Connected to Database');
});

module.exports = db;