const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  year: Number,
  movie: String,
  duration: Number,
  director: String,
  comments: [String],
});
const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel