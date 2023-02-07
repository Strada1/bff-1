const Category = require('../models/category.js');

const getCategories = () => {
  return Category.find({});
};

const createCategory = ({ title }) => {
  return Category.create({ title });
};

const updateCategory = (id, { title }) => {
  if (Category.findById(id)) {
    return false;
  }
  return Category.findByIdAndUpdate(id, { title });
};

const deliteCategory = (id) => {
  if (Category.findById(id)) {
    return false;
  }
  return Category.findByIdAndDelete(id);
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deliteCategory,
};
