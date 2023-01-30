const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  director: String,
  category: { type: 'ObjectId', ref: 'Category' },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
