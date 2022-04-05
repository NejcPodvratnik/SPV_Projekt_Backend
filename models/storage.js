var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var storageSchema = new Schema({
	'user_id' : Schema.Types.ObjectId,
	'ingredients' : Map
});

var User =  mongoose.model('storage', storageSchema);
module.exports = User;