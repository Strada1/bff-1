const { CategoryModal } = require('../models/Categories');

const createCategory = async (req, res) => {
  try {
    const doc = new CategoryModal({
      title: req.body.title,
    });

    await CategoryModal.create(doc); // добавляем документ

    return res.status(201).json({
      message: 'Category created',
    }); // возвращаем ответ
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createCategory,
};
