const CategoryModel = require("../models/category");

const categoryCreate = (req) => {
  return CategoryModel.create(req.body);
};

module.exports = { categoryCreate };
