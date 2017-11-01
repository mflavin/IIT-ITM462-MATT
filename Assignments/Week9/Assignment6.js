var express = require("express");
var app = express();
var fs = require("fs"); 
var bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./users_controller.js');

app.get('/users/:id', UsersControllerId );
app.get('/users/:id/reminders/', RemindersControllerRem );
app.get('/users/:id/reminders/:reminder', RemindersControllerRemId );

app.post('/users/', UsersControllerCreateUser );
app.post('/users/:id/reminders/', RemindersControllerCreateRem );

app.delete('/users/:id', UsersControllerDeleteUser );
app.delete('/users/:id/reminders/', RemindersControllerDeleteRem );
app.delete('/users/:id/reminders/:reminder', RemindersControllerDeleteRemId );

app.listen(3000, function() {
  console.log('Node app is running on port', 3000);
});