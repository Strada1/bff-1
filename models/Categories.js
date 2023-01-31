const mongoose = require('../db');
const CategoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  raiting: Number,
});

const categories = mongoose.model('Categories', CategoriesSchema);
module.exports = {categories, CategoriesSchema};
