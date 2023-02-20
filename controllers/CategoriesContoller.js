const { CategoryModal } = require('../models/Categories');
const { CategoryService } = require('../services/сategories.service');

const createCategory = async (req, res) => {
  try {
    const doc = new CategoryModal({
      title: req.body.title,
    });

    await CategoryModal.create(doc);

    return res.status(201).json({
      message: 'Category created',
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { sort } = req.query;
    const allCategories = await CategoryService.getAllCategories(sort);
    return res.status(200).json(allCategories);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    return CategoryModal.updateOne(
      { _id: categoryId },
      {
        title: req.body.title,
      },
      res.json({
        success: true,
      }),
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};
const removeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    return await CategoryModal.findOneAndDelete({ _id: categoryId }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Не удалось удалить категорию',
        });
      }
      if (!doc) {
        return res.status(400).json({
          message: 'Не удалось найти категорию',
        });
      }
      return res.json({
        success: true,
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
};
