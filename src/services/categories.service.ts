import { Types } from 'mongoose';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';
import { Category, ICategory } from '../models/categories.model';

export function getCategories() {
  return Category.find().lean();
}

export async function getCategory(id: string | Types.ObjectId) {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(STATUS.NOT_FOUND, 'Category not found');
  }

  return category;
}

export async function createCategory({ title }: ICategory) {
  const category = await Category.create({ title });

  if (!title) {
    throw new ApiError(STATUS.BAD_REQUEST, 'required fields are missing');
  }

  return category;
}

export async function updateCategory(
  id: string | Types.ObjectId,
  { title }: ICategory
) {
  const category = await Category.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );

  if (!category) {
    throw new ApiError(STATUS.NOT_FOUND, 'Category not found');
  }

  return category;
}

export async function deleteCategory(id: string | Types.ObjectId) {
  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new ApiError(STATUS.NOT_FOUND, 'Category not found');
  }

  return deletedCategory;
}
