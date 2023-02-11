import { SortOrder, Types } from 'mongoose';
import { Category, ICategory } from '../models/categories.model';

export function getCategories({ sortOrder }: { sortOrder: SortOrder }) {
  const query = Category.find().lean();

  if (sortOrder) {
    query.sort({ title: sortOrder });
  }

  return query;
}

export function getCategory(id: string | Types.ObjectId) {
  return Category.findById(id);
}

export function createCategory(data: ICategory) {
  return Category.create(data);
}

export function updateCategory(id: string | Types.ObjectId, data: ICategory) {
  return Category.findByIdAndUpdate(id, data, { new: true });
}

export function deleteCategory(id: string | Types.ObjectId) {
  return Category.findByIdAndDelete(id);
}
