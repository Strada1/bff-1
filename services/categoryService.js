const CategoryModel = require('../models/categoryModel');

const findAllCategories = ({ sort }) => {
	const query = CategoryModel.find();
	if (sort) query
		.sort({
			title: 1
		});

	return query;
}

const createCategory = ({ title }) => {
	return CategoryModel.create({ title });
}

const findItemById = (id) => {
	return CategoryModel.findById(id);
}

const findAndDelete = (id) => {
	return CategoryModel.findByIdAndDelete(id);
}

const findAndUpdate = (id, body, options) => {
	return CategoryModel.findByIdAndUpdate(id, body, options);
}


module.exports = { findAllCategories, createCategory, findItemById, findAndDelete, findAndUpdate };