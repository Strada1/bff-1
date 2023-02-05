const CategoryModel = require("../models/category");

const getAllCategories = () => {
  return CategoryModel.find();
}

const addCategory = ({ title }) => {
  return CategoryModel.create({ title });
}

module.exports = { getAllCategories, addCategory };