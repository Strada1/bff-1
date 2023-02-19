const Categories = require('../../models/Categories');

const getAllCategories = async (sortBy = 'title') => {
  const allCategories = await Categories.find({}).sort(`field ${sortBy}`).lean();
  return allCategories;
};

const addCategory = async (category) => {
  await Categories.create(category);
};

const updateCategory = async (categoryId, category) => {
  await Categories.findByIdAndUpdate(categoryId, category);
};
const deleteCategory = async (categoryId) => {
  await Categories.findByIdAndDelete(categoryId);
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
