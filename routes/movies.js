import { Router } from 'express';

import Schema from '../schemas/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    return res.status(201).send('get movies');
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await Schema.Movie.create(req.body);
    return res.status(201).send('movie created: ' + movie);
  } catch {
    return res.status(500).send('request error');
  }
});

router.delete('/:movieId', async (req, res) => {
  try {
    return res.status(201).send('movie deleted');
  } catch {
    return res.status(500).send('request error');
  }
});

export default router;
