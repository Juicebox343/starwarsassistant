const express = require("express"),
	  router  = express.Router(),
	  db = require("../db_connect.js"),
	  request = require('request'),
	  {darkSkyEndPoint} = require('../config');
	  

var options = {
  url: 'https://api.darksky.net/forecast/' + DARKSKY_END + '/37.6293992,-121.0008507'
};



router.get('/', isAuthenticated, function(req, res, next){
	let user = req.user[0].id;
	var q = "SELECT * FROM characters WHERE owning_user = ?";
	db.query(q, [user], function(err, results){
	if(err){
	console.log(err);
	} else {
		var characterList = results;
		res.render("characters/index", {characterList: characterList, user: user});
	}
	});
});

router.get('/:id', isAuthenticated, function(req, res, next){
	let user = req.params.id;

	var q = 'SELECT first_name, family_name, id FROM characters WHERE id = ?;SELECT characters.first_name AS sender, characters.id AS senderID, messages.subject, messages.created_at AS received, messages.id AS messageID, ABS(DATEDIFF(CURRENT_TIMESTAMP, messages.created_at)) AS days_since, c.first_name AS currentUser, rid.id AS currentUserID FROM characters LEFT JOIN messages ON characters.id = messages.fromChar LEFT JOIN characters AS c ON c.id = messages.toChar LEFT JOIN characters AS rid ON rid.id = messages.toChar LEFT JOIN characters AS sid on sid.id = messages.fromChar WHERE messages.toChar = ? ORDER BY received DESC';;
	db.query(q, [user, user], function(err, results){
	if(err){
	console.log(err);
	} else {
		request(options, function(req, res){
			let weatherDetails = JSON.parse(res.body);
			sendData(weatherDetails);
		});
		function sendData(weather){
			var characterDetails = results[0];
			var messageDetails = results[1];

			res.render("characters/show", {weather: weather,characterDetails: characterDetails, messageDetails: messageDetails, user: user});
		}
		
	}
	});
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}


module.exports = router;
