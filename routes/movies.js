import { Router } from 'express';

import movieService from '../services/movieService.js';
import addCommentsRoutes from './comments.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    return res.status(201).send(movies);
  } catch {
    return res.status(500).send('request error');
  }
});

router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await movieService
      .getMovie(movieId)
      .populate('director')
      .populate('comments')
      .populate('category');
    return res.status(201).send(movie);
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    await movieService.createMovie(req.body);
    return res.status(201).send('movie created');
  } catch {
    return res.status(500).send('request error');
  }
});

router.put('/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    await movieService.updateMovie(id, req.body);
    return res.status(201).send('movie updated');
  } catch {
    return res.status(500).send('request error');
  }
});

router.delete('/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    await movieService.deleteMovie(id);
    return res.status(201).send('movie deleted');
  } catch {
    return res.status(500).send('request error');
  }
});

addCommentsRoutes(router);

export default router;
