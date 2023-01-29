import { Router } from 'express';
import { CategoryModel } from '../../models/index.js';

const categoryRouter = Router();

categoryRouter.post('/categories', async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    return res.status(201).send('category created');
  } catch {
    return res.status(500).send('ooops!!!');
  }
});

export { categoryRouter };
