const CategoryModel = require("../models/category");

const allCategories = () => {
  return CategoryModel.find();
};

const categoryCreate = (req) => {
  return CategoryModel.create(req.body);
};

const categoryDelete = (req) => {
  return CategoryModel.findByIdAndDelete({ _id: req.params.categoryId });
};

const categoryEdit = (req) => {
  return CategoryModel.findByIdAndUpdate(
    { _id: req.params.categoryId },
    req.body,
    {
      new: true,
    }
  );
};

module.exports = {
  categoryCreate,
  categoryDelete,
  categoryEdit,
  allCategories,
};
