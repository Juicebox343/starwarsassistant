const express = require("express"),
	  router  = express.Router({mergeParams: true}),
	  db = require("../db_connect.js");


//inbox
router.get('/', isAuthenticated, function(req, res, next){
	let user = req.params.id;
	var q = 'SELECT first_name, family_name, id FROM characters WHERE id = ?;SELECT characters.first_name AS sender, characters.id AS senderID, messages.subject, messages.content AS message, messages.created_at AS received, ABS(DATEDIFF(CURRENT_TIMESTAMP, messages.created_at)) AS days_since, messages.id as messageID, c.first_name AS currentUser, rid.id AS currentUserID FROM characters LEFT JOIN messages ON characters.id = messages.fromChar LEFT JOIN characters AS c ON c.id = messages.toChar LEFT JOIN characters AS rid ON rid.id = messages.toChar LEFT JOIN characters AS sid on sid.id = messages.fromChar WHERE messages.toChar = ? ORDER BY received DESC';
	db.query(q, [user, user], function(err, results){
	if(err){
	console.log(err);
	} else {
		let screen = 'inbox';
		var characterDetails = results[0];
		var messageDetails = results[1];
		res.render("inbox/index", {characterDetails: characterDetails, messageDetails: messageDetails, screen:screen});
		}
	})
});

//outbox
router.get('/sent-messages', isAuthenticated, function(req, res){
	let user = req.params.id;
	let message = req.params.messageID;
	var q = 'SELECT first_name, family_name, id FROM characters WHERE id = ?;SELECT characters.first_name AS recipient, characters.id AS recipientID, messages.subject, messages.content AS message, messages.created_at AS sent, messages.id as messageID, ABS(DATEDIFF(CURRENT_TIMESTAMP, messages.created_at)) AS days_since, c.first_name AS currentUser, sid.id AS currentUserID FROM characters LEFT JOIN messages ON characters.id = messages.toChar LEFT JOIN characters AS c ON c.id = messages.fromChar LEFT JOIN characters AS sid ON sid.id = messages.fromChar LEFT JOIN characters AS rid on rid.id = messages.toChar WHERE messages.fromChar = ? ORDER BY sent DESC';
	db.query(q, [user, user], function(err, results){
	if(err){
	console.log(err);
	} else {
		let screen = 'outbox';
		var characterDetails = results[0];
		var messageDetails = results[1];
		res.render("inbox/index", {characterDetails: characterDetails, messageDetails: messageDetails, screen:screen});
		}
	})
});

//new message form
router.get('/new', isAuthenticated, function(req, res){
	let user = req.params.id;
	var q = 'SELECT id, first_name FROM characters WHERE NOT owning_user = ?';
	db.query(q, [user], function(err, results){
	if(err){
	console.log(err);
	} else {
	let characters = results;
	let screen = "new";
	res.render('inbox/new', {characters: characters, screen: screen, user:user});
	}
	});
});

//send message
router.post('/new', isAuthenticated, function(req, res){
	var messageSender = req.user[0].id;
	var messageRecipient = req.body.recipient;
	var messageSubject = req.body.subject;
	var messageContent = req.body.message;
	var q = "INSERT INTO messages (fromChar, toChar, subject, content, created_at) VALUES ('" + messageSender + "', '" + messageRecipient + "', '" + messageSubject + "', '" + messageContent + "', CURRENT_TIMESTAMP)";
	db.query(q, function(err, results){
		if(err){
			console.log(err);
		} else {
			res.redirect('/characters/'+ messageSender + '/inbox');
		};
	});
});

//reply form
router.get('/:messageID/reply', isAuthenticated, function(req, res){
	let user = req.params.id;
	let message = req.params.messageID;
	var q = 'SELECT characters.first_name FROM messages LEFT JOIN characters ON characters.id = messages.fromChar WHERE messages.id = ?;SELECT characters.first_name AS sender, characters.id AS senderID, messages.subject, messages.content AS message, messages.created_at AS received, messages.id as messageID, c.first_name AS currentUser, rid.id AS currentUserID FROM characters LEFT JOIN messages ON characters.id = messages.fromChar LEFT JOIN characters AS c ON c.id = messages.toChar LEFT JOIN characters AS rid ON rid.id = messages.toChar LEFT JOIN characters AS sid on sid.id = messages.fromChar WHERE messages.id = ?';
	db.query(q, [message, message], function(err, results){
	if(err){
	console.log(err);
	} else {
	let parentName = results[0];
	let parentMessage = results[1];
	let screen = "reply";
	res.render('inbox/new', {parentName: parentName, parentMessage: parentMessage, screen:screen, user:user});
	}
	});
});

//send reply
router.post('/:messageID/reply', isAuthenticated, function(req, res){
	var messageSender = req.params.id;
	var messageParent = req.params.messageID;
	var messageRecipient = req.body.recipient;
	var messageSubject = req.body.subject;
	var messageContent = req.body.message;
	console.log(messageParent);
	var q = "INSERT INTO messages (toChar, fromChar, subject, content, parentID, created_at) SELECT messages.fromChar, '" + messageSender + "', 'RE: " + messageSubject + "', '" + messageContent + "','" + messageParent + "', CURRENT_TIMESTAMP FROM messages LEFT JOIN characters ON characters.id = messages.fromChar WHERE messages.id = '" + messageParent + "'";
	db.query(q, function(err, results){
		if(err){
			console.log(err);
		} else {
			res.redirect('/characters/'+ messageSender + '/');
		};
	});
});

//show specific email
router.get('/:messageID', isAuthenticated, function(req, res, next){
	let user = req.params.id;
	let message = req.params.messageID;
	console.log(message)
	var q = 'SELECT first_name, family_name, id FROM characters WHERE id = ?;SELECT characters.first_name AS sender, characters.id AS senderID, messages.subject, messages.content AS message, messages.created_at AS received, messages.id as messageID, c.first_name AS currentUser, rid.id AS currentUserID FROM characters LEFT JOIN messages ON characters.id = messages.fromChar LEFT JOIN characters AS c ON c.id = messages.toChar LEFT JOIN characters AS rid ON rid.id = messages.toChar LEFT JOIN characters AS sid on sid.id = messages.fromChar WHERE messages.id = ?;SELECT characters.first_name AS sender, characters.id AS senderID, messages.subject, messages.content AS message, messages.created_at AS received, messages.id as messageID, c.first_name AS currentUser, rid.id AS currentUserID FROM characters LEFT JOIN messages ON characters.id = messages.fromChar LEFT JOIN characters AS c ON c.id = messages.toChar LEFT JOIN characters AS rid ON rid.id = messages.toChar LEFT JOIN characters AS sid on sid.id = messages.fromChar WHERE messages.parentID = ?';
	db.query(q, [user, message, message], function(err, results){
	if(err){
	console.log(err);
	} else {
		let screen = 'inbox';
		var characterDetails = results[0];
		var messageDetails = results[1];
		var parentMessage = results [2];
		res.render("inbox/show", {characterDetails: characterDetails, messageDetails: messageDetails, parentMessage: parentMessage, screen:screen});
		}
	})
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}

module.exports = router;
