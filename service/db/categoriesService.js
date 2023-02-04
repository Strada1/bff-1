const Categories = require('../../models/Categories');

const getAllCategories = async () => {
  const allCategories = await Categories.find({});
  return allCategories;
};

const addCategory = async (category) => {
  await Categories.create(category);
};

const updateCategory = async (categoryId, category) => {
  await Categories.findByIdAndUpdate({_id: categoryId}, category);
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
