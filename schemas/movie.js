import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
  year: Number,
  title: String,
  rating: Number,
  duration: Number,
  director: { type: 'ObjectId', ref: 'Director' },
  category: { type: 'ObjectId', ref: 'Category' },
  comments: [{ type: 'ObjectId', ref: 'Comment' }],
});

const Movie = model('Movie', MovieSchema);

export default Movie;
