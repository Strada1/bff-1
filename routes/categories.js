import { Router } from 'express';

import Schema from '../schemas/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    return res.status(201).send('get categories');
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Schema.Category.create(req.body);
    return res.status(201).send('category created: ' + category);
  } catch {
    return res.status(500).send('request error');
  }
});

export default router;
