var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({

    email          : String,
    reg_source     : String, //Source of registration

    local            : {
        username     : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String
    },
    google           : {
        id           : String,
        token        : String
    }

});

//We create a variable accesible outside of this file. Variable will be a mongoose schema with added functions
var User = module.exports = mongoose.model('User', UserSchema);

//Functions for making last touches new user objects and then saves them in database

module.exports.createLocalUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.local.password, salt, function(err, hash) {
        newUser.local.password = hash;
        newUser.save(callback);
    });
  });
}

module.exports.createFacebookUser = function(newUser, callback){
  newUser.save(callback);
}

module.exports.createGoogleUser = function(newUser, callback){
  newUser.save(callback);
}


module.exports.createGoogleUser = function(newUser, callback){
  newUser.save(callback);
}

//Getters for users

module.exports.getUserByLocalUsername = function(username, callback){
  var query = {'local.username': username}; 
  User.findOne(query, callback);
}

module.exports.getUserByFacebookId = function(id, callback){
  var query = {'facebook.id': id}; 
  User.findOne(query, callback);
}

module.exports.getUserByGoogleId = function(id, callback){
  var query = {'google.id': id}; 
  User.findOne(query, callback);
}


module.exports.getUserById = function(id, callback){
  var query = {_id: mongoose.mongo.ObjectId(id)}; 
  User.findOne(query, callback);
}

// Password stuff

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}