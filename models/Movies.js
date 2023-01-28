const mongoose = require('../db');
const MoviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: String,
  year: Number,
  duration: Number,
  director: String,
});
const movies = mongoose.model('Movies', MoviesSchema);
module.exports = movies;
