import { Router } from 'express';
import { body, param } from 'express-validator';
import * as categoriesController from '../controllers/categories.controller';
import { validate } from '../middlewares/validate';
import { OBJECT_ID_LENGTH_RANGE } from '../shared/const';

const router = Router();

router
  .route('/')
  .get(categoriesController.getCategories)
  .post(
    validate([body('title').notEmpty()]),
    categoriesController.createCategory
  );

router
  .route('/:categoryId')
  .all(validate([param('categoryId').isLength(OBJECT_ID_LENGTH_RANGE)]))
  .get(categoriesController.getCategory)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory);

export { router as categoriesRoute };
