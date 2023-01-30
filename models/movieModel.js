const mongoose = require('mongoose');

// определяем схему
const MovieSchema = new mongoose.Schema({ 
    title: String,
    category: String,
    year: Number,
    duration: Number,
    director: String,
  });

  // создаем модель по схеме
const Movie = mongoose.model('Movie', MovieSchema); 

module.exports = Movie;