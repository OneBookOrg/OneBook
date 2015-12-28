var express = require('express')
var mongoose = require('mongoose')
var http = require('http')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var hash = require('./pass').hash
var cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var app = express();
app.use(express.static('site'));


mongoose.connect('mongodb://localhost/OneBookDB')

app.use(session({
	secret : 'shhh, secret',
	resave : true,
	saveUninitialized : true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('../models/users.js');
require('../models/organizations.js');
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
	//fn(new Error('User hashcodes do not match. Invalid Password'));
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
			req.session.regenerate(function(){
	            req.session.user = user
	            console.log(user.username + " Has been successfully registered")
				res.json({
					success : true
				});
        	});
			
		});
	});

});

app.post('/login', function(req, res){

	authenticate(req.body.username, req.body.password, function(err, user){
		if(user){
			req.session.regenerate(function(){
		        req.session.user = user;
		        res.json({
		        	success : true
		        });
		        console.log("Auth success for '%s'", user.username);
      		});
		}
		else{
			req.session.error = 'Authentication failed, please check your '
        + ' username and password.';
        	res.json({
        		success : false,
        		errMessage : 'Authentication failed'
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

app.post('/addUserToOrg', function(req, res){
	//Need to change this to get user from the current session IMPORTANT
	User.update(
		{username : req.session.user.username},
		//Need to change this to search for valid organization prior to adding to set
		{$addToSet : {userOrgs : {orgname : req.body.orgName}}},
		function(err, result){
			
			if(err){
				console.log("ERROR " + err)
				res.json({
					success : false
				});
				return;
			}
			res.json({
				success : true
			})
		}
	)

});


//Need to change this to get user from the current session IMPORTANT.
//NEED TO FIGURE OUT MONGO SESSION STORING. 
app.get('/userOrgs/:username', function(req, res){
	//To get this data make the request http://localhost:8000/userOrgs/'username' replacing username
	User.findOne( {'username' : req.params.username}, function(err, user){
		if(err){
			console.log("Error, user does not exist. " + err);
			res.json({
				success : false
			});
			return;
		}
		res.json({
			success : true,
			userOrgs : user.userOrgs
		});
		return;
	});
});

app.get('/login', function(req, res){

});




var portNumber = 8000;
app.listen(portNumber);


console.log("OneBook server is listening on port " + portNumber)

