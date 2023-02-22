const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({ 
    title: { type: String, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    year: Number,
    duration: Number,
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Director", required: true },
    description: { type: String, required: true},
  });

const Movie = mongoose.model('Movie', MovieSchema); 

module.exports = Movie;