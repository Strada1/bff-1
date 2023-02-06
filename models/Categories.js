const {Schema, model} = require('../db');

const categoriesSchema = new Schema({
  title: String,
});
const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
