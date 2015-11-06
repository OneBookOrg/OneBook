var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
	username : {
		type : String,
		unique : true
	},
	hashcode : String,
	//Using register_date as salt val
	register_date : Date
});

mongoose.model('users', userSchema);
