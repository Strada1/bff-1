const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  duration: Number,
  director: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category, Movie }