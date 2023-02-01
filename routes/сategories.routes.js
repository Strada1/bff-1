const { Router } = require('express');
const { createCategory } = require('../controllers/CategoriesContoller');

const router = Router();

router
  .post('/categories', createCategory);

module.exports = router;
