const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const CategorySchema = new mongoose.Schema({
    title: String
},{versionKey: false});

const Category = mongoose.model('Category', CategorySchema);

const CommentSchema = new mongoose.Schema({
    nickname: String,
    text: String,
    date: Date,
}, {versionKey: false});

const Comment = mongoose.model('Comment', CommentSchema);

const MovieSchema = new mongoose.Schema({
    title: String,
    category: {type: 'ObjectId', ref: 'Category'},
    year: Number,
    duration: Number,
    director: String,
    comments: [{type: 'ObjectId', ref: 'Comment'}],
},{versionKey: false});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
    Movie,
    Category,
    Comment
};