var APP_CONFIG = require('../app-config.js');
var User = require('../models/User');
var request = require('superagent');

//Middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

//Routes
var express = require('express');
var router = express.Router();



router.get('/api/example', function(req,res) {
  passport.authenticate('jwt', function(err, user, info){

    if(err){
      res.send('You are not supposed to be here!');
    }
    else{
      res.send('You are authorized');
    }

  });
});



module.exports = router;