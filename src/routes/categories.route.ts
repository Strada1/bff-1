import { Router } from 'express';
import { body, param } from 'express-validator';
import * as categoriesController from '../controllers/categories.controller';
import { validate } from '../middlewares/validate';
import { categoryValidation } from '../models/categories.model';
import { sortOrderValidation } from '../shared/validations';

const router = Router();

router
  .route('/')
  .all(validate([...categoryValidation]))
  .get(validate([...sortOrderValidation]), categoriesController.getCategories)
  .post(
    validate([body('title').exists()]),
    categoriesController.createCategory
  );

router
  .route('/:categoryId')
  .all(validate([param('categoryId').isMongoId(), ...categoryValidation]))
  .get(categoriesController.getCategory)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory);

export { router as categoriesRoute };
