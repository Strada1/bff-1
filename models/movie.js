const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: { type: ObjectId, ref: "Category" },
  duration: Number,
  directorId: { type: ObjectId, ref: "Director" },
  comment: "",
});

const MovieModel = mongoose.model("Movie", MovieSchema);

module.exports = MovieModel;
