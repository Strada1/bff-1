const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: { type: ObjectId, ref: 'Category' },
  year: {
    type: Number,
    required: true,
  },
  movie: String,
  duration: Number,
  director: String,
});
const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel