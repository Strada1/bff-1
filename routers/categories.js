const {Router} = require('express');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {getCategories, addCategory, updateCategory, deleteCategory} = require('../controllers/categories');
const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.CATEGORIES.ALL, getCategories);

router.post(
  PATHS.CATEGORIES.ALL,
  [body('title').notEmpty().withMessage('the title field should not be empty')],
  validate,
  addCategory
);

router.put(
  PATHS.CATEGORIES.BY_ID,
  [
    body('title').notEmpty().withMessage('the title field should not be empty'),
    param('categoryId').notEmpty().withMessage('categoryId is required param'),
  ],
  validate,
  updateCategory
);

router.delete(
  PATHS.CATEGORIES.BY_ID,
  [param('categoryId').notEmpty().withMessage('categoryId is required param')],
  validate,
  deleteCategory
);

module.exports = router;
