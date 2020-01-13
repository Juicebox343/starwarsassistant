const express = require("express"),
	  router  = express.Router(),
	  db = require("../db_connect.js"),
	  request = require('request');

router.get('/', isAuthenticated, function(req, res, next){
	res.render("session-manager/index");
});

router.get('/:id', isAuthenticated, function(req, res, next){
	res.render("session-manager/show");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}

module.exports = router;