const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  year: {
    type: Number,
    required: true,
  },
  duration: Number,
  director: String,
});
const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel