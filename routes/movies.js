import { Router } from 'express';

import Schema from '../schemas/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Schema.Movie.find();
    return res.status(201).send(movies);
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    await Schema.Movie.create(req.body);
    return res.status(201).send('movie created');
  } catch {
    return res.status(500).send('request error');
  }
});

router.put('/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    await Schema.Movie.findByIdAndUpdate(id, req.body);
    return res.status(201).send('movie updated');
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/:movieId/comments', async (req, res) => {
  const id = req.params.movieId;
  try {
    const movie = await Schema.Movie.findById(id);
    movie.comments.push({ body: req.body.comment, date: new Date() });
    movie.save();
    return res.status(201).send('comment added');
  } catch {
    return res.status(500).send('request error');
  }
});

router.delete('/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    await Schema.Movie.findByIdAndDelete(id);
    return res.status(201).send('movie deleted');
  } catch {
    return res.status(500).send('request error');
  }
});

export default router;
