const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  director: { type: 'ObjectId', ref: 'Director' },
  duration: Number,
  category: { type: 'ObjectId', ref: 'Category' },
  comments: [{ type: 'ObjectId', ref: 'Comment' }],
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
