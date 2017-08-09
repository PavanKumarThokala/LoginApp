var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
/* GET users listing. */
router.post('/register', function(req, res, next) {

  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var birthdate = req.body.birthdate;
  var country = req.body.country;
  var username = req.body.username;

  req.checkBody('name','Name required').notEmpty();
  req.checkBody('password','Password required').notEmpty();
  req.checkBody('email','Email required').notEmpty();
  req.checkBody('email','Proper Email required').isEmail();
  req.checkBody('birthdate','Date of Birth required').notEmpty();
  req.checkBody('country','Country required').notEmpty();
  req.checkBody('username','User Name required').notEmpty();

  var errors = req.getValidationResult();

  if(errors){
    res.render('register',{
      errors: errors
    });
  }
  else{
    var newUser = new User({
      name: name,
      email: email,
      password: password,
      birthdate: birthdate,
      country: country,
      username: username
    });
    User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
  }
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/logout', function(req, res, next) {
  res.render('logout');
});
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,'Unknown User');
      }
      User.comparePassword(password,function(err,user){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        }
        else{
          return done(null,false,{message: 'Invalid Password'});
        }
      });
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
router.post('login',passport.authenticate('local',{successRedirect: '/',failureRedirect: '/users/login',failureFlash: true},function(req,res,next){
  res.redirect('/');
});

module.exports = router;
