const CategoryModel = require("../models/category");

const getAllCategories = () => {
  return CategoryModel.find();
}

const addCategory = ({ title }) => {
  return CategoryModel.create({ title });
}

const removeCategory = ({ id }) => {
  return CategoryModel.findOneAndDelete(id)
}

const updateCategory = (id, { title }) => {
  return CategoryModel.findOneAndUpdate(id, { title }, { new: true });
}

module.exports = { getAllCategories, addCategory, removeCategory, updateCategory };