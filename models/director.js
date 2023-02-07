const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  director: String,
  movieId: { type: 'ObjectId', ref: 'Movie' },
});

const Director = mongoose.model('Director', DirectorSchema);

module.exports = Director;
