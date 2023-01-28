import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller';

const router = Router();

router
  .route('/')
  .get(categoriesController.getCategories)
  .post(categoriesController.createCategory);

router
  .route('/:categoryId')
  .put(categoriesController.editCategory)
  .delete(categoriesController.deleteCategory);

export { router as categoriesRoute };
