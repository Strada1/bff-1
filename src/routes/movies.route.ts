import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as moviesController from '../controllers/movies.controller';
import { validate } from '../middlewares/validate';
import { movieValidation } from '../models/movies.model';
import { sortOrderValidation } from '../shared/validations';

const router = Router();

router
  .route('/')
  .all(validate([...movieValidation]))
  .get(
    validate([...sortOrderValidation, query('year').optional().isNumeric()]),
    moviesController.getMovies
  )
  .post(
    validate([body('title').exists(), body('category').exists()]),
    moviesController.createMovie
  );

router
  .route('/:movieId')
  .all(validate([param('movieId').isMongoId(), ...movieValidation]))
  .get(moviesController.getMovie)
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

router
  .route('/test-aggregation/count-by-director')
  .get(moviesController.aggregateByDirector);

router
  .route('/test-aggregation/count-by-dates')
  .get(
    validate([query('from').isNumeric(), query('to').isNumeric()]),
    moviesController.aggregateByDates
  );

export { router as moviesRoute };
