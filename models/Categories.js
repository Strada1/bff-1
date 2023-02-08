const {Schema, model} = require('../db');

const categoriesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});
const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
