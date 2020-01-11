mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
	user     : 'root',
	password : 'BumbleBucket_42',
    database : 'wdf2',
	multipleStatements: true
});

db.connect((err) =>{
    if(err){
        throw err;
    } 
    console.log('Connected to Database');
});

module.exports = db;