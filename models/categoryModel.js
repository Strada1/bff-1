const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: String,
  });
  
  
  const Category = mongoose.model('Category', CategorySchema);

  module.exports = Category;