var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  password: {
    type: String,
    minlength: 6
  },
  email: {
    type: String,
    email: true
  },
  country: {
    type: String
  },
  birthdate: {
    type: String
  },
  username: {
    type: String
  }
});

var User = mongoose.model('User',User);

module.exports = User;

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
});
}
module.exports.getUserByUsername = function(username,callback){
  var query = {username: username};
  User.findOne(query, callback);
}
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}
module.exports.comparePassword = function(hash, callback){
  bcrypt.compare(candidatePassword,hash,function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
