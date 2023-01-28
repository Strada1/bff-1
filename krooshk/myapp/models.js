
mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    title:String,
    year:Number,
    duration:Number,
    director: String,
    category: String,
});
const CategorySchema = new mongoose.Schema({
    title:String,
});

exports.Movie=mongoose.model('Movie',MovieSchema);
exports.Category=mongoose.model('Category',CategorySchema);