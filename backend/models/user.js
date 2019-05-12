const mongoose = require('mongoose');

const schema = mongoose.Schema({

    username : {type:String , required:true , unique:true},
    email : {type:String , required:true , unique:true},
    password : {type:String,required:true}
});

schema.statics.getUserByUsername = function(username, callback) {
    let query = {username: username};
    user.findOne(query, callback);
  }

schema.statics.getUserById = function(id, callback) {
    user.findById(id, callback);
  }

const user = mongoose.model('users',schema);
module.exports=user;