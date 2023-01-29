import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
  title: String,
  year: Number,
  rating: Number,
  director: String,
});

const CategoryChema = new Schema({
  title: String,
});

export const MovieModel = model('Movie', MovieSchema);
export const CategoryModel = model('Category', CategoryChema);
