import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { authorization } from '../middlewares/authorization';
import * as moviesController from '../controllers/movies.controller';
import { validate } from '../middlewares/validate';
import { movieValidation } from '../models/movies.model';
import { sortOrderValidation } from '../shared/validations';
import { ROLES } from '../shared/const';
import { authentication } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .all(validate([...movieValidation]))
  .get(
    validate([...sortOrderValidation, query('year').optional().isNumeric()]),
    moviesController.getMovies
  )
  .post(
    authentication(),
    authorization([ROLES.ADMIN]),
    validate([body('title').exists(), body('category').exists()]),
    moviesController.createMovie
  );

router
  .route('/:movieId')
  .all(validate([param('movieId').isMongoId(), ...movieValidation]))
  .get(moviesController.getMovie)
  .put(
    authentication(),
    authorization([ROLES.ADMIN]),
    moviesController.updateMovie
  )
  .delete(
    authentication(),
    authorization([ROLES.ADMIN]),
    moviesController.deleteMovie
  );

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
