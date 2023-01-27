const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({ // определяем схему
  title: String,
});

const CategoryModal = mongoose.model('Category', CategorySchema);

module.exports = {
  CategoryModal,
};
