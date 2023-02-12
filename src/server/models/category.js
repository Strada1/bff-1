const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  title: String,
  movies: [{ type: 'ObjectId', ref: 'Movie' }],
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel