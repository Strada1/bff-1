const { CategoryModal } = require('../models/Categories');

class CategoryService {
  getAllCategories({ sort }) {
    const query = CategoryModal.find().populate('movies');
    if (sort) query.sort({ title: sort });
    return query.exec();
  }
}

module.exports = new CategoryService();
