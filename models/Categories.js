const { ObjectId } = require('mongodb');
const mongoose = require('../db');

const CategorySchema = new mongoose.Schema({
  title: String,
  movies: [{ type: ObjectId, ref: 'Movie' }],
});

const CategoryModal = mongoose.model('Category', CategorySchema);

module.exports = {
  CategoryModal,
};
