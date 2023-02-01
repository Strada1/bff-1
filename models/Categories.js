const mongoose = require('../db');

const CategorySchema = new mongoose.Schema({
  title: String,
});

const CategoryModal = mongoose.model('Category', CategorySchema);

module.exports = {
  CategoryModal,
};
