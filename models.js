const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: String
},{versionKey: false});

const Category = mongoose.model('Category', CategorySchema);

const MovieSchema = new mongoose.Schema({
    title: String,
    category: String,
    year: Number,
    duration: Number,
    director: String
},{versionKey: false});
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
    Movie,
    Category
};