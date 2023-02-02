import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
  rating: Number,
  category: { type: 'ObjectId', ref: 'Category' },
  comments: [{ body: String, date: Date }],
});

const Movie = model('Movie', MovieSchema);

export default Movie;
