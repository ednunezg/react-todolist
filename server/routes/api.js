var APP_CONFIG = require('../app-config.js');
var User = require('../models/User');
var Task = require('../models/Task');
var Tasktag = require('../models/Tasktag');
var request = require('superagent');

//Middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

//Routes
var express = require('express');
var router = express.Router();

router.post('/task_create', passport.authenticate('jwt', { session: false }), function(req,res) {

  //Error checking
  var errors={};
  req.checkBody('title','Task title is required').notEmpty();
  req.checkBody('tags','List of task tags is required in request').exists();
  if(req.validationErrors()){errors=req.validationErrors()};
  if(req.body.tags){
    for(var i=0; i<req.body.tags.length; i++){
      if(!Tasktag.tagExists(req.body.tags[i])){
        errors.tags=('Tag with id ' + req.body.tags[i] + ' does not exist in DB')
      };
    }
  }
  if(Object.keys(errors).length !== 0){
    return res.status(400).json({ message: 'Unable to create task with this title and tags', errors: errors });
  }
  //Create task and insert into DB
  var taskTitle = req.body.title;
  var taskTags = req.body.tags; //Array of object IDs

  var task = new Task();
  task.user_id = req.user._id;
  task.date_created = new Date();
  task.title = taskTitle;
  task.marked_done = false;
  task.tags = taskTags;

  Task.createTask(task, function(err, task){
    if(err){
      console.log("err = " + err);
      return res.status(400).json({message: "Unable to insert task in DB", error: err.message});
    }
    if(!task){
      return res.status(400).json({message: "Unable to insert task in DB"});
    }
    else{
      return res.status(200).json({message: "Task created succesfully" , task: task});
    }
  });
});


router.post('/task_toggledone', passport.authenticate('jwt', { session: false }), function(req,res) {
  
    //Error checking
    req.checkBody('id','Id must be a 24 byte hex string ID').isMongoId();
    if(req.validationErrors()){
      return res.status(400).json({ message: 'Unable to create task with this title and tags', errors: req.validationErrors() });        
    };
  //Toggle task in DB
    var id = req.body.id;
    Task.toggleDone(req.body.id,function(err,doc){
      if(err){
        console.log("Error on task toggle = " + err);
        return res.status(400).json({message: "Unable to toggle task in database", error: err.message});
      }
      if(!doc){
        return res.status(400).json({message: "Unable to toggle task in database"});
      }
      else{
        return res.status(200).json({message: "Task toggled succesfully"});
      }
    });
    
  });


  router.post('/task_delete', passport.authenticate('jwt', { session: false }), function(req,res) {
    
      //Error checking
      req.checkBody('id','Id must be a 24 byte hex string ID').isMongoId();
      if(req.validationErrors()){
        return res.status(400).json({ message: 'Unable to delete task with this ID', errors: req.validationErrors() });        
      };
      
      //Toggle task in DB
      Task.deleteTask(req.body.id,function(err,doc){
        if(err){
          console.log("Error on task delete = " + err);
          return res.status(400).json({message: "Unable to delete task in database", error: err.message});
        }
        if(!doc){
          return res.status(400).json({message: "Unable to delete task in database"});
        }
        else{
          return res.status(200).json({message: "Task deleted succesfully"});
        }
      });
    });
  
    router.post('/task_getall', passport.authenticate('jwt', { session: false }), function(req,res) {
              
        
        Task.getUserTasks(req.user._id,function(err,doc){
          if(err){
            console.log("Error on task getall = " + err);
            return res.status(400).json({message: "Unable to get tasks", error: err.message});
          }
          if(!doc){
            return res.status(400).json({message: "Unable to get tasks"});
          }
          else{
            return res.status(200).json({message: "Tasks retrieved succesfully", tasks: doc});
          }
        });
    });



  
router.post('/tasktag_getall', passport.authenticate('jwt', { session: false }), function(req,res) {      
  Tasktag.getUserTags(req.user._id, function(err,doc){
    if(err){
      console.log("Error on task getall = " + err);
      return res.status(400).json({message: "Unable to get tags", error: err.message});
    }
    if(!doc){
      return res.status(400).json({message: "Unable to get tags"});
    }
    else{
      return res.status(200).json({message: "Tags retrieved succesfully", tags: doc});
    }
  });
});

router.post('/tasktag_create', passport.authenticate('jwt', { session: false }), function(req,res) {
  
    //Error checking
    var errors={};
    req.checkBody('name','Tag name is required').notEmpty();
    if(req.validationErrors()){
      return res.status(400).json({ message: 'Unable to insert tag in DB', errors: req.validationErrors() });
    };
    
    //Create tag and insert into DB
    var tag = new Tasktag();
    tag.user_id = req.user._id;
    tag.name = req.body.name;
  
    Tasktag.createTag(tag, function(err, tag){
      if(err){
        console.log("err = " + err);
        return res.status(400).json({message: "Unable to insert tag in DB", error: err.message});
      }
      if(!tag){
        return res.status(400).json({message: "Unable to insert tag in DB"});
      }
      else{
        return res.status(200).json({message: "Tag created succesfully", tag: tag});
      }
    });
});

router.post('/tasktag_delete', passport.authenticate('jwt', { session: false }), function(req,res) {
  
    //Error checking
    req.checkBody('id','Tag ID was not provided').isEmpty();
    if(req.validationErrors()){
      return res.status(400).json({ message: 'Unable to delete tag with this name', errors: req.validationErrors() });        
    };
    
    //Toggle task in DB
    Tasktag.deleteTask(req.body.id,function(err,doc){
      if(err){
        console.log("Error on tag delete = " + err);
        return res.status(400).json({message: "Unable to delete tag in database", error: err.message});
      }
      if(!doc){
        return res.status(400).json({message: "Unable to delete tag in database"});
      }
      else{
        return res.status(200).json({message: "Tag deleted succesfully"});
      }
    });
});


//Example protected api. Make a POST request to this endpoint with JWT in the body as 'Authorization'
router.post('/example', passport.authenticate('jwt', { session: false }), function(req,res) {
  console.log("Example of a protected api called");
  //If user is not authorized, passport will send a 401 response
  res.status(200).json({message: 'You are authorized as ' + req.user.name});

});


module.exports = router;