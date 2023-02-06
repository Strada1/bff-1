import { Router } from 'express';
import { body, param } from 'express-validator';
import * as moviesController from '../controllers/movies.controller';
import { validate } from '../middlewares/validate';
import { OBJECT_ID_LENGTH_RANGE } from '../shared/const';

const router = Router();

router
  .route('/')
  .get(moviesController.getMovies)
  .post(
    validate([
      body('title').notEmpty(),
      body('category').isLength(OBJECT_ID_LENGTH_RANGE),
      body('director').optional().isLength(OBJECT_ID_LENGTH_RANGE),
    ]),
    moviesController.createMovie
  );

router
  .route('/:movieId')
  .all(validate([param('movieId').isLength(OBJECT_ID_LENGTH_RANGE)]))
  .get(moviesController.getMovie)
  .put(
    validate([
      body('category').optional().isLength(OBJECT_ID_LENGTH_RANGE),
      body('director').optional().isLength(OBJECT_ID_LENGTH_RANGE),
    ]),
    moviesController.updateMovie
  )
  .delete(moviesController.deleteMovie);

export { router as moviesRoute };
