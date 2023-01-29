import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  title: String,
});

const Category = model('Category', CategorySchema);

export default Category;
