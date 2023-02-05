import Schema from '../schemas/index.js';

const createCategory = (category) => Schema.Category.create(category);

const readCategories = () => Schema.Category.find().lean();

const readCategory = (id) => Schema.Category.findById(id).lean();

const updateCategory = (id, category) => Schema.Category.findByIdAndUpdate(id, category);

const deleteCategory = (id) => Schema.Category.findByIdAndDelete(id);

export default {
  readCategories,
  readCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
