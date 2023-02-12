const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const CategorySchema = new mongoose.Schema({
  title: String,
  movies: [{ type: ObjectId, ref: 'Movie' }],
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel