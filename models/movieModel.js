const mongoose = require('mongoose');

// определяем схему
const MovieSchema = new mongoose.Schema({ 
    title: String,
    year: Number,
    duration: Number,
    director: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  });

  // создаем модель по схеме
const Movie = mongoose.model('Movie', MovieSchema); 

module.exports = Movie;