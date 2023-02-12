const CategoryModel = require("../models/category");

const getAllCategories = (sort) => {
  const query = CategoryModel.find().populate('movies')
  if (sort) query.sort({ title: sort })
  return query.exec();
}

const addCategory = (data) => {
  return CategoryModel.create(data);
}

const removeCategory = ({ id }) => {
  return CategoryModel.findOneAndDelete(id)
}

const updateCategory = (id, { title }) => {
  return CategoryModel.findOneAndUpdate(id, { title }, { new: true });
}

module.exports = { getAllCategories, addCategory, removeCategory, updateCategory };