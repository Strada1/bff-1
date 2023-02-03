const CategoryModel = require('../models/categoryModel');


const createCategory = ({ title}) => { 
	return CategoryModel.create({ title}); 
}


module.exports = { createCategory };