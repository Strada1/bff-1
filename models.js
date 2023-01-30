const mongoose = require("./db_connect.js")

const MovieSchema = new mongoose.Schema({
	title: {type: String, required: true}, 
	category: {type: String, required: true}, 
	year: {type: Number, required: true}, 
	duration: {type: Number, required: true},  
	director: {type: String, required: true}
});

const CategorySchema = new mongoose.Schema({
	title: {type: String, required: true}
});

module.exports.Movie = mongoose.model('Movie', MovieSchema);
module.exports.Category = mongoose.model('Category', CategorySchema);