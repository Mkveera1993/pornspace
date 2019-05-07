'use strict';

var User=require('../models/user_model');
var mongoose=require('mongoose');

function getUsers(query,callback){
    User.find(query,{salt:0,passwordHash:0},function(err,users){
        if(err){
            callback(err);
        }else{
            callback(null,users);
        }
    });
}

function getUser(id,callback){
     id = mongoose.Types.ObjectId(id);
    User.findById(id,{salt:0,passwordHash:0},function(err,user){
        if(err){
            callback(err);
        }else{
            callback(null,user);
        }
    });
}




var userService={
    getUsers:getUsers,
    getUser:getUser   
};


module.exports=userService;