import { db } from '../ext/db';

const CategorySchema = new db.Schema({
  category: String,
});

export const Category = db.model('Category', CategorySchema);
