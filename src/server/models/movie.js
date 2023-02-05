const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: 'ObjectId',
    ref: 'Category'
  },
  year: Number,
  movie: String,
  duration: Number,
  directorId: {
    type: 'ObjectId',
    ref: 'Director'
  },
  comments: [{}]
});
const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel