var express = require('express')
var mongoose = require('mongoose')
var http = require('http')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var hash = require('./pass').hash

var app = express();
app.use(express.static('site'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./models/users.js');
require('./models/organizations.js');
var User = mongoose.model('users');
var Org = mongoose.model('organizations');




app.get('/', function(req, res){
	res.send("hello, connected.");
});

function authenticate (name, pass, fn){
	
	User.findOne( {'username' : name}, function(err, user){
		if(err){
			console.log("Error, user does not exist. " + err);
			return fn(new Error('Cannot find user.'));
		}
		//Uses the users registration date as their salt value
		tempSalt = user.register_date.toString().replace(/\s+/g, '');
		
		hash(pass, tempSalt, function(err, hash){
			if(err) 
				return fn(err);
			if(hash.toString('hex') == user.hashcode)
				return fn(null, user);
		});
	});
	
	

	fn(new Error('User hashcodes do not match. Invalid Password'));
} 

app.post('/register', function(req, res){
	var user = new User ({
		username : req.body.username,
		hashcode : "",
		phone_number : req.body.phone_number, //Change phone numbers to a default format easy for searching
		register_date : Date.now()
	});
	//Uses the users registration date as their salt value
	tempSalt = user.register_date.toString().replace(/\s+/g, '');

	hash(req.body.password, tempSalt, function(err, hash){
		
		if(err) return err;
		user.hashcode = hash.toString('hex');

		user.save(function(err){
			if(err){
				console.log(err)
				res.json({
					success : false,
					error : 'User already exists.'
				});
				return;
			}
			console.log(user + " Has been successfully registered")
			res.json({
				success : true
			});
		});
	});

});

app.post('/login', function(req, res){

	authenticate(req.body.username, req.body.password, function(err, user){
		if(user){
			console.log(user.username + " was successfully logged in!");
			res.json({
				success : true
			});
		}
	});
})


app.post('/createOrg', function(req, res){
	var org = new Org ({
		orgname : req.body.orgname
	});

	org.save(function(err){
		if(err){
			console.log(err);
			res.json({
				success : false,
				error : 'Organization already exists'
			});
			return;
		}
		res.json({
			success : true
		});
	});
});


app.get('/login', function(req, res){

});




var portNumber = 8000;
app.listen(portNumber);
mongoose.connect('mongodb://localhost/OneBookDB')

console.log("OneBook server is listening on port " + portNumber)

