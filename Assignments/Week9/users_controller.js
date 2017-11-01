var express = require("express");
var app = express();
var fs = require("fs"); 
var Users = [];

var time = require("moment");

//Checks the time
function now() {
    return time().format('MMMM Do YYYY, h:mm:ss a');
}

//Gets user
UsersControllerId = function (req, res) {
  var id = req.params.id;
  
  if (!Users[id]) {
    res.status(404);
    res.send("User Not Found!");
  }
  else { 
    res.status(200);
    res.send(Users[id].user);
  }
};

//Creates user
UsersControllerCreateUser = function (req, res) {
  var user = req.body.user;
  var i = Users.length;
  
  res.header("Content-Type", "application/json");
  res.status(200);
  
  user.created = now();
  Users.push({ user, reminder: [] });
  res.send({ id: i });
};

UsersControllerDeleteUser = function (req, res) {
  var id = req.params.id;
  
  if (!Users[id]) {
    res.status(404);
    res.send("User Not Found!");
  }
  else {
    res.status(204);
    delete Users[id];
    res.end();
  }
};

//Gets reminders
RemindersControllerRem = function (req, res) {
   var id = req.params.id;
   var rem = req.params.reminder;
  
   if (!Users[id]) {
    res.status(404);
    res.send("User Not Found!");
  }
  else if (!Users[id].reminder) {
    res.status(404);
    res.send("No Reminders Found!");
  }
  else {
    res.status(200);   
    res.send(Users[id].reminder);
  }
};

//Gets reminders by user
RemindersControllerRemId = function (req, res) {
  var id = req.params.id;
  var rem = req.params.reminder;
  
  if (!Users[id]) {
    res.status(404);
    res.send("User Not Found!");
  }
  else if (!Users[id].reminder) {
    res.status(404);
    res.send("No Reminders Found!");
  }
  else if (!Users[id].reminder[rem]) {
    res.status(404);
    res.send("Reminder Not Found!");
  }
  else {
    res.status(200);
    res.send(Users[id].reminder[rem]);
  }
};

//Creats reminders for users
RemindersControllerCreateRem = function (req, res) {  
  var id = req.params.id;
  
  if (!Users[id]) {
    res.status(404);
    res.send("User doesn't exist");
  }
  else {
    var i = Users[id].reminder.length;
    
    res.header("Content-Type", "application/json");
    res.status(200);
    
    req.body.reminder.created = now();
    Users[id].reminder.push(req.body.reminder);
    res.send({id : i});
  }
};

//Deletes all of a users reminders
RemindersControllerDeleteRem = function (req, res) {
  var id = req.params.id;
  
  if (!Users[id]) {
    res.status(404);
    res.send("User Not Found!");
  }
  else {
    res.status(204);
    delete Users[id].reminder;
    res.end();
  }
};

//Deletes a single reminder of a user
RemindersControllerDeleteRemId = function (req, res) {
  var id = req.params.id;
  var rem = req.params.reminder;
  
  if (!Users[id]) {
    res.status(404);
    res.send("User Not Found!");
  }
  else if (!Users[id].reminder[rem]) {
    res.status(404);
    res.send("Reminder Not Found!");
  }
  else {
    res.status(204);
    delete Users[id].reminder[rem];
    res.end();
  }
};