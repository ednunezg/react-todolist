var mongoose = require('mongoose');

var TasktagSchema = mongoose.Schema({

    name           : String,
    user_id        : mongoose.Schema.Types.ObjectId //User that created this task
    
});

//We create a variable accesible outside of this file. Variable will be a mongoose schema with added functions
var Tasktag = module.exports = mongoose.model('Tasktag', TasktagSchema);


module.exports.createTag = function(newTag, callback){
  newTag.save(callback);
}

module.exports.deleteTag = function(tagId, callback){
  Tasktag.findByIdAndRemove(tagId, callback);
}

module.exports.getUserTags = function(userId, callback){
  var query = {'user_id': userId}; 
  Tasktag.find(query, callback);
}

module.exports.tagExists = function(id){
  var query = {_id: mongoose.mongo.ObjectId(id)};
  var promise = Tasktag.find(query);
  promise.then(function(data){
    return true; 
  }, function(err) {
    if(err){console.log(err)};
    return false;
  });
}