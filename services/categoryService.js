const {Category} = require("../models");

const createCategory = (body) => {
    return Category.create(body)
}

const updateCategory = (id, body) => {
    return Category.findByIdAndUpdate(id, body);
}

const deleteCategory = (id) => {
    return Category.findByIdAndDelete(id);
}

const getCategoryById = (id) => {
    return Category.findById(id);
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
}