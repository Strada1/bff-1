"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const categories_model_1 = require("../models/categories.model");
function getCategories({ sortOrder }) {
    const query = categories_model_1.Category.find().lean();
    if (sortOrder) {
        query.sort({ title: sortOrder });
    }
    return query;
}
exports.getCategories = getCategories;
function getCategory(id) {
    return categories_model_1.Category.findById(id);
}
exports.getCategory = getCategory;
function createCategory(data) {
    return categories_model_1.Category.create(data);
}
exports.createCategory = createCategory;
function updateCategory(id, data) {
    return categories_model_1.Category.findByIdAndUpdate(id, data, { new: true });
}
exports.updateCategory = updateCategory;
function deleteCategory(id) {
    return categories_model_1.Category.findByIdAndDelete(id);
}
exports.deleteCategory = deleteCategory;
