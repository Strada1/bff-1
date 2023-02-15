const mongoose = require('../db');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
  },
});

const MovieModal = mongoose.model('Movie', MovieSchema);

module.exports = {
  MovieModal,
};
