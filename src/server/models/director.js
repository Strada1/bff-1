const mongoose = require('mongoose')

const DirectorSchema = new mongoose.Schema({
  title: String,
  movies: [{ type: 'ObjectId', ref: 'Movie' }],
});

const DirectorModel = mongoose.model('Director', DirectorSchema);

module.exports = DirectorModel