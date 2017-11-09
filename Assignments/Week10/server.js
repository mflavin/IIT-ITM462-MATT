const express = require('express'), bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(express.static('work'))

var Users = [];

// Only necessary if serving a static file at the root route.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../work', 'index.html')))

app.route('/users')
  .get(function (req, res) {
    res.json(Users)
  })
  .post(function (req, res) {
  	var newUser = {};
    newUser.id = req.body.id;
  	newUser.name = req.body.name;
  	newUser.email = req.body.email;
    newUser.reminder = req.body.reminder;

  	Users.push(newUser);
    res.json(newUser);
  });

app.route('/users/:id')
  .get(function (req, res) {
  	function Id(user) {
	    return user.id == req.params.id;
	}
  	var whichUser = Users.find(Id)
  	if(whichUser !== undefined) {
    	res.json(whichUser);
  	} else {
  		res.status(404).send("No User Found");
  	}
  })
  .delete(function (req, res) {
  	var newUsers = Users.filter(function(user) {
	    return user.id != req.params.id;
	})  
  
  Users = newUsers;
  res.status(204).send('No content');
  
  });
  
app.route('/users/:id/reminders')
  .get(function (req, res) {
  	function Id(user) {
	    return user.id == req.params.id;
    }
  	var whichUser = Users.find(Id)
  	if(whichUser !== undefined) {
    	res.json(whichUser);
  	} 
    else {
  		res.status(404).send("No User Found");
    }
  })
  .delete(function (req, res) {
  	var newUsers = Users.filter(function(user) {
	    return user.id != req.params.id;
    })
	})   
  
  
app.route('/users/:id/reminders')
  .post(function (req, res) {
    var rem = req.body.reminder;
    Users[req.body.id].reminder = rem;
    res.json(Users);
  });  

app.listen(3000, () => console.log('Example app listening on port 3000!'))