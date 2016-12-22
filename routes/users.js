var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');

// Login
router.get('/login', function(req, res){
  res.render('login');
});

// Dashboard
router.get('/dashboard', function(req, res){
  res.render('dashboard');
});

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password,
      message: message
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
      router.post('/adduser', function(req, res) {
          var db = req.db;
          var collection = db.get('userlist');
          collection.insert(req.body, function(err, result){
              res.send(
                  (err === null) ? { msg: '' } : { msg: err }
              );
          });
      });
		});

    /* GET userlist */
    router.get('/userlist', function(req, res) {
        var db = req.db;
        var collection = db.get('userlist');
        collection.find({},{},function(e,docs) {
            res.json(docs);
        });
    });

    /* DELETE to delete user. */
    router.delete('/deleteuser/:id', function(req, res) {
        var db = req.db;
        var collection = db.get('userlist');
        var userToDelete = req.params.id;
        collection.remove({ '_id' : userToDelete }, function(err) {
            res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
        });
    });
    

		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Goodbye!');
	res.redirect('/users/login');
});

module.exports = router;
