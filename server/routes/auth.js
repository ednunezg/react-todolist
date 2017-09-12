var APP_CONFIG = require('../app-config.js');
var User = require('../models/User');

//Middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//Serialize/deserialize
//Seriale user takes in a user object and passes the id to the callback function 'done'
passport.serializeUser(function(user,done){
  done(null, user.id);
});

//Given a user id, we search the database for the user and pass it to the callback function done
passport.deserializeUser(function(id, done){
  User.getUserById(id, function(err, user){
    done(err, user);
  });
});

//JWT Strategy is used to verify a client's JWT before accessing a 'secret' route
passport.use('jwt', new JwtStrategy(
  {
  jwtFromRequest  : ExtractJwt,
  secretOrKey     : APP_CONFIG.jwtSecret
  },
  function(jwt_payload, next){
    console.log('Json web token payload received: ', jwt_payload);
    // usually this would be a database call:
    var user = User.getUserById(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }  
  }
));

//THe following are strategies for logging in, all of which respond to the client with a JWT if succesful
passport.use('local',new LocalStrategy(
  function(username, password, done) {
    
    //Here, we create our own custom local strategy
    //We use custom functions from our User mongoose object to talk to the database
    //The process of our local strategy consists of
      //1. Verifying user exists
      //2. Check if password matches

    console.log("Strategy engaged! user = " + username + " password = " + password);
    
    User.getUserByLocalUsername(username, function(err, user){

      if(err){
        console.log("Throwing error");
        throw err;
      }
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.local.password, function(err, isMatch){ //The callback function will be executed after the Mongo query
        if(err){
          console.log("Throwing error");
          throw err;
        }
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'})
        }
      });
    });
}));

passport.use('facebook', new FacebookStrategy({
  clientID        : APP_CONFIG.facebookConfig.appID,
  clientSecret    : APP_CONFIG.facebookConfig.appSecret,
  callbackURL     : APP_CONFIG.facebookConfig.callbackUrl,
  profileFields: ['id', 'displayName', 'email'] 
  },
 
  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {
     
      // find the user in the database based on their facebook id
      User.getUserByFacebookId(profile.id, function(err, user){
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);
 
          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
                        
            // set all of the facebook information in our user model
            var newUser = new User();
            newUser.email = (profile.emails[0].value || '').toLowerCase();
            newUser.name = profile.displayName;
            newUser.reg_source = 'facebook';
            newUser.facebook.id = profile.id;
            newUser.facebook.token = access_token;

            User.createFacebookUser(newUser, function(err, user){
              if(err) return done(err);
              return done(null, newUser);
            });
         } 
      });
    });
}));

passport.use('google', new GoogleStrategy({
  clientID        : APP_CONFIG.googleConfig.appID,
  clientSecret    : APP_CONFIG.googleConfig.appSecret,
  callbackURL     : APP_CONFIG.googleConfig.callbackUrl,
  passReqToCallback   : true
  },
  // facebook will send back the tokens and profile
  function(request, access_token, refresh_token, profile, done) { 
    // asynchronous
    process.nextTick(function() {
      // find the user in the database based on their facebook id
      User.getUserByGoogleId(profile.id, function(err, user){
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);
 
          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
                                    
            var newUser = new User();
            newUser.email = (profile.emails[0].value || '').toLowerCase();
            newUser.name = profile.displayName;
            newUser.reg_source = 'google';
            newUser.google.id = profile.id;
            newUser.google.token = access_token;

            User.createGoogleUser(newUser, function(err, user){
              if(err) return done(err);
              return done(null, newUser);
            });
         } 
      });
    });
}));

//Routes
var express = require('express');
var router = express.Router();


router.post('/login/local', function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return res.status(403).json({message: err});
    }
    if (!user) { 
      return res.status(401).json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log(err);
        return res.status(403).json({message: err});
      }

      var payload = {id: user._id};
      var token = jwt.sign(payload, APP_CONFIG.jwtSecret);  
      return res.status(200).json({message: 'User has been authorized', token: token});
    });
  })(req, res);
});

router.get("/secretRouteTest",
function(req, res, next){
  console.log(req.get('Authorization'));
  next();
}, function(req, res){
  res.json("debugging");
});


router.post('/register/local', function (req, res) {

  //Get form fields
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var username = req.body.username;
  var password1 = req.body.password1;
  var password2 = req.body.password2;

  //Register form back-end validation
  req.checkBody('firstname','First name is required').notEmpty();
  req.checkBody('lastname','Last name is required').notEmpty();
  req.checkBody('email','Email name is required').notEmpty();
  req.checkBody('username','Username is required').notEmpty();    
  req.checkBody('password1','Password is required').notEmpty();
  req.checkBody('password2','Re-enter your password').notEmpty();
  req.checkBody('email','Not a valid email').isEmail();
  req.checkBody('password2','Passwords do not match').equals(password1);
  var errors = req.validationErrors();

  //If errors, send out an invalid request HTTP response (400),
  if(errors){
    return res.status(403).json({
      message: 'There was an error in the registration form',
      errors: errors
    })
  } else {
    //Create new user
    var newUser = new User();
    newUser.name = (firstname + " " + lastname),
    newUser.email = email;
    newUser.reg_source = 'local';
    newUser.local.username = username;
    newUser.local.password = password1;

    try{
      User.createLocalUser(newUser, function(err, user){
        if(err){
          throw err;
        }
        console.log("User has been created: ")
        console.log(user);
      });
    } catch (err) {
      console.log(err);
      res.status(409).json({
        message: 'User registration could not be fulfilled at this time'
      })
    }

    return res.status(200).json({
      message: 'User registered succesfully.'
    })
  }
});

module.exports = router;