import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
  rating: Number,
});

const Movie = model('Movie', MovieSchema);

export default Movie;
