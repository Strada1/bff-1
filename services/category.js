const { Category } = require("../models/category");

async function getCategories() {
    return await Category.find();
}

async function createCategory(values) {
    await Category.create(values);
}

async function updateCategory(id, values) {
    await Category.findOneAndUpdate({_id: id}, values);
}

async function deleteCategory(id) {
    await Category.findOneAndDelete({_id: id});
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
