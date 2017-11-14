process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
	beforeEach((done) => {
		User.remove({}, (err) => { 
		   done();		   
		});		
	});
 
//Test the /POST route
  describe('/POST user', () => {
	  it('it should POST a user ', (done) => {
	  	let user = {
	  		name: "bobby",
	  		email: "bobbert@jim.com"
	  	}
			chai.request(server)
		    .post('/user')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('User successfully added!');
			  	res.body.user.should.have.property('name');
			  	res.body.user.should.have.property('email');
		      done();
		    });
	  });
  });
  
//Test the /GET/:id route
  describe('/GET/:id user', () => {
	  it('it should GET a user by the given id', (done) => {
	  	let user = new User({name: "bobby", email: "bobbert@jim.com"});
	  	user.save((err, user) => {
	  		chai.request(server)
		    .get('/user/' + user.id)
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('email');
			  	res.body.should.have.property('_id').eql(user.id);
		      done();
		    });
	  	});
	  });
  });
 
//Test the /DELETE/:id route  
  describe('/DELETE/:id user', () => {
	  it('it should DELETE a user given the id', (done) => {
	  	let user = new User({name: "bobby", email: "bobbert@bob.com"})
	  	user.save((err, user) => {
				chai.request(server)
			    .delete('/user/' + user.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('User successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
  
//Test the /POST:id/reminders route
  describe('/POST/:id/reminders Reminder', () => {
	  it('it should POST a reminder ', (done) => {
	  	let user = {
	  		name: "Bob, Superhero",
	  		email: "Bob@google.com",
        reminders: [{title: "work", description: "Doing it"}]
	  	}
			chai.request(server)
		    .post('/user/' + user.id + "/reminders")
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Reminder successfully added!');
          res.body.user.should.have.property('reminders');
          res.body.user.reminders[0].should.have.property('title');
          res.body.user.reminders[0].should.have.property('description');
          res.body.user.should.have.property('_id').eql(res.body.user._id);
		      done();
		    });
	  });
  });
  
//Test the /GET/:id/reminders route
  describe('/GET/:id/reminders Reminder', () => {
	  it('it should GET a users reminders', (done) => {
	  	let user = new User({name: "bobby", email: "bobbert@jim.com", reminders: [{title: "work", description: "Doing it"}]});
	  	user.save((err, user) => {
	  		chai.request(server)
		    .get('/user/' + user.id + "/reminders")
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('reminders');
          res.body.reminders[0].should.have.property('title');
          res.body.reminders[0].should.have.property('description');
          res.body.should.have.property('_id').eql(user.id);
		      done();
		    });
	  	});
	  });
  });
 
//Test the /DELETE/:id/reminders route 
  describe('/DELETE/:id/reminders user', () => {
	  it('it should DELETE a reminder given the id', (done) => {
	  	let user = new User({name: "bobby", email: "bobbert@bob.com", reminders: [{title: "work", description: "Doing it"}]})
	  	user.save((err, user) => {
				chai.request(server)
			    .delete('/user/' + user.id + "/reminders")
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Reminders successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });

//Test the /GET/:id/reminders/:rem route
  describe('/GET/:id/reminders/:rem user', () => {
	  it('it should GET a users sepcific reminder', (done) => {
	  	let user = new User({name: "bobby", email: "bobbert@jim.com", reminders: [{title: "work", description: "Doing it"}]});
	  	user.save((err, user) => {
	  		chai.request(server)
		    .get('/user/' + user.id + "/reminders/" + user.reminders[0].id)
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('reminders');
          res.body.should.have.property('_id').eql(user.id);
          res.body.reminders[0].should.have.property('_id').eql(user.reminders[0].id);
		      done();
		    });
	  	});
	  });
  });

//Test the /DELETE/:id/reminders/:rem route
  describe('/DELETE/:id/reminders/:rem user', () => {
	  it('it should DELETE a users specific reminder', (done) => {
	  	let user = new User({name: "bobby", email: "bobbert@bob.com", reminders: [{title: "work", description: "Doing it"}]})
	  	user.save((err, user) => {
				chai.request(server)
			    .delete('/user/' + user.id + '/reminders/' + user.reminders[0].id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Reminder successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
  
});