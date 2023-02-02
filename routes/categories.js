import { Router } from 'express';

import Schema from '../schemas/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Schema.Category.find();
    return res.status(201).send(categories);
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    await Schema.Category.create(req.body);
    return res.status(201).send('category created');
  } catch {
    return res.status(500).send('request error');
  }
});

router.put('/:categoryId', async (req, res) => {
  const id = req.params.categoryId;
  try {
    await Schema.Category.findByIdAndUpdate(id, req.body);
    return res.status(201).send('category update');
  } catch {
    return res.status(500).send('request error');
  }
});

router.delete('/:categoryId', async (req, res) => {
  const id = req.params.categoryId;
  try {
    await Schema.Category.findByIdAndDelete(id);
    return res.status(201).send('category deleted');
  } catch {
    return res.status(500).send('request error');
  }
});

export default router;
