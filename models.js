const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: String,
    category: [String],
    year: Number,
    rating: Number,
    duration: Number,
    director: [String]
  });

const CategorySchema = new mongoose.Schema({
  title: String,
});

const Movie = mongoose.model('Movie', MovieSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = { Movie, Category };
