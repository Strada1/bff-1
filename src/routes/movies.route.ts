import { Router } from 'express';
import * as moviesController from '../controllers/movies.controller';

const router = Router();

router
  .route('/')
  .get(moviesController.getMovies)
  .post(moviesController.createMovie);

router
  .route('/:movieId')
  .get(moviesController.getMovie)
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

export { router as moviesRoute };
