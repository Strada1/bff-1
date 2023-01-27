const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({ // определяем схему
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rating: Number,
});

const MovieModal = mongoose.model('Movie', MovieSchema);

module.exports = {
  MovieModal,
};
