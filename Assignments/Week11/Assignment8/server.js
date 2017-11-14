let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
let user = require('./app/routes/user');
let config = require('config');

let options = { 
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.route("/user")
	.post(user.postUser);
app.route("/user/:id")
	.get(user.getUserId)
	.delete(user.deleteUser);
app.route("/user/:id/reminders")
  .post(user.postReminders)
  .get(user.getReminders)
  .delete(user.deleteReminders);
app.route("/user/:id/reminders/:rem")
  .get(user.getRemindersId)
	.delete(user.deleteRemindersId);
  
app.listen(port);
console.log("Listening on port " + port);

module.exports = app;