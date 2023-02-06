const mongoose = require('../db');

const categoriesSchema = new mongoose.Schema({
  title: String,
});
const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
