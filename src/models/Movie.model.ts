import { db } from '../ext/db';

const MovieSchema = new db.Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
});

export const Movie = db.model('Movie', MovieSchema);
