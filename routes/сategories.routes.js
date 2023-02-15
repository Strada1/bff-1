const { Router } = require('express');
const {
  createCategory, getAllCategories, updateCategory, removeCategory,
} = require('../controllers/CategoriesContoller');

const router = Router();

router
  .post('/categories', createCategory)
  .get('/categories', getAllCategories)
  .put('/categories/:id', updateCategory)
  .delete('/categories/:id', removeCategory);

module.exports = router;
