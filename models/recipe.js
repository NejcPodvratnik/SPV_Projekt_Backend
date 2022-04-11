var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var recipeSchema = new Schema({
    'name' : String,
	'ingredients' : Map,
    'instructions' : String,
    'image_path' : String
});

var Recipe =  mongoose.model('recipe', recipeSchema);
module.exports = Recipe;