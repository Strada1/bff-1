const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: String
},{versionKey: false});

const Category = mongoose.model('Category', CategorySchema);

const MovieSchema = new mongoose.Schema({
    title: String,
    category: {type: 'ObjectId', ref: 'Category'},
    year: Number,
    duration: Number,
    director: String,
    comments: Array,
},{versionKey: false});
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
    Movie,
    Category
};