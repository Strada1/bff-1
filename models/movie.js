const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: String,
  duration: Number,
  director: String,
});

const MovieModel = mongoose.model("Movie", MovieSchema);

module.exports = MovieModel;
