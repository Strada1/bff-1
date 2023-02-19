const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  year: Number,
  movie: String,
  duration: Number,
  description: String,
  directorId: {
    type: ObjectId,
    ref: 'Director'
  },
  comments: [{ title: String, date: Date }]
});
const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel