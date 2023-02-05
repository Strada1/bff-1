const mongoose = require('../db');
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directors',
  },
  year: Number,
  duration: Number,
  comments: [String],
});
const Movies = mongoose.model('Movies', moviesSchema);
module.exports = Movies;
