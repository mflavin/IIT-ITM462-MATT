let mongoose = require('mongoose');
let User = require('../models/user');

//POST /user to save a new user
function postUser(req, res) {
	var newUser = new User(req.body);
	
	newUser.save((err,user) => {
		if(err) {
			res.send(err);
		}
		else {
			res.json({message: "User successfully added!", user });
		}
	});
}

//POST /user/:id/reminders to save a new reminder
function postReminders(req, res) {
	var newUser = new User(req.body);

	newUser.save((err,user) => {
		if(err) {
			res.send(err);
		}
		else {
			res.json({message: "Reminder successfully added!", user });
		}
	});
}

//GET /user/:id route to retrieve a user given its id
function getUserId(req, res) {
	User.findById(req.params.id, (err, user) => {
		if(err) 
      res.send(err);
    
		res.json(user);
	});		
}

//GET /user/:id/reminders route
function getReminders(req, res) {
	User.findById(req.params.id, (err, user) => {
		if(err) 
      res.send(err);
    
		res.json(user);
	});		
}

//GET /user/:id/reminders/:rem route
function getRemindersId(req, res) {
	User.findById(req.params.id, (err, user) => {
		if(err) 
      res.send(err);
    
		res.json(user);
	});		
}

//DELETE /user/:id to delete a user given its id
function deleteUser(req, res) {
	User.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "User successfully deleted!", result });
	});
}

//DELETE /user/:id/reminders to delete a user given its id
function deleteReminders(req, res) {
	User.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Reminders successfully deleted!", result });
	});
}

//DELETE /user/:id/reminders/:rem to delete a user given its id
function deleteRemindersId(req, res) {
	User.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Reminder successfully deleted!", result });
	});
}

module.exports = { postUser, postReminders, getUserId, deleteUser, deleteReminders, getReminders, getRemindersId, deleteRemindersId };