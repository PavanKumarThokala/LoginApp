var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res, next) {

  var name = req.body.firstName;
  var password = req.body.password;
  var email = req.body.email;
  var birthdate = req.body.birthDate;
  var country = req.body.country;

  req.checkBody('name','Name required').notEmpty();
  req.checkBody('password','Password required').notEmpty();
  req.checkBody('email','Email required').notEmpty();
  req.checkBody('email','Proper Email required').isEmail();
  req.checkBody('birthdate','Date of Birth required').notEmpty().isDate();
  req.checkBody('country','Country required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors: errors
    });
  }
  else{
    console.log('Success');
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

module.exports = router;
