const express 			= require('express'),
	  db 				= require('../db_connect.js'),
	  bcrypt 			= require('bcrypt'),
	  session 			= require('express-session'),
	  passport			= require('passport'),
	  LocalStrategy		= require('passport-local').Strategy,
	  router 			= express.Router({mergeParams: true});

router.use(require('express-session')({
	secret: 'these pretzels are making me thirsty',
	resave: false,
	saveUninitialized: false
}));

const saltRounds = 10;

router.use(passport.initialize());
router.use(passport.session());

passport.use('local', new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
	if(!username || !password ) { 
		return done(null, false); 
	}
	var q = 'SELECT * FROM users WHERE username = ?';
	db.query(q, [username],function(err, user){
    	if (err) { 
			return done();
		} else if(!user.length){
			return done(null, false); 
		} else {
      		var hashed = user.password;
			bcrypt.compare(password, hashed, function(err, res) {
				return done(null, user);
			});
		};
	});
}));

passport.serializeUser(function(user, done) {
    done(null, user[0].username); 
});

passport.deserializeUser(function(username, done) {
   db.query('SELECT * FROM users WHERE username = ?;', [username], function(err, user) {
        done(err, user);
    });
});

//Landing Page
router.get('/', function(req, res){
    res.render('landing');
});

//log in request for user page
router.post('/logmein', passport.authenticate('local', {
	successRedirect: '/user-page', 
	failureRedirect: '/'
}));

router.get('/logout', function(req, res){
	req.session.destroy((err) => {
		if(err) return next(err)
	req.logout()
	res.redirect("/");
	})
});

router.post('/register', function(req, res, next){
	var firstname = req.body.firstname;
	var username = req.body.username;
	bcrypt.genSalt(saltRounds, function(err, salt) {	
		if (err) return next(err);
		bcrypt.hash(req.body.password, salt, function(err, hash) {
			if (err) return next(err);
			var q = "INSERT INTO users (first_name, username, password) VALUES ('" + firstname + "', '" + username + "', '" + hash + "')";	
			db.query(q, function(err, results){
				if(err){
					console.log(err);
				} else {
					passport.authenticate('local')(req, res, function(){
						res.redirect('/characters');
					});
				};
			});
		});
	});
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/user-page', function(req, res, next){
	let user = { 
		id : req.user[0].id,
		first : req.user[0].first_name,
		username : req.user[0].username
	};

	res.render('user-page', {user: user});
});

module.exports = router;


