const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({ 
    title: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    year: Number,
    duration: Number,
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
  });

const Movie = mongoose.model('Movie', MovieSchema); 

module.exports = Movie;