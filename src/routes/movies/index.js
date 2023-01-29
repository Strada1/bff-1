import { Router } from 'express';
import { MovieModel } from '../../models/index.js';

const moviesRouter = Router();

moviesRouter.post('/movies', async (req, res) => {
  try {
    const movie = await MovieModel.create(req.body);
    return res.status(201).send('movie created');
  } catch {
    return res.status(500).send('ooops!!!');
  }
});

export { moviesRouter };
