import { Router } from 'express';

import categoryService from '../services/categoryService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await categoryService.readCategories();
    return res.status(201).send(categories);
  } catch {
    return res.status(500).send('request error');
  }
});

router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await categoryService.readCategory(categoryId);
    return res.status(201).send(category);
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    await categoryService.createCategory(req.body);
    return res.status(201).send('category created');
  } catch {
    return res.status(500).send('request error');
  }
});

router.put('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    await categoryService.updateCategory(categoryId, req.body);
    return res.status(201).send('category update');
  } catch {
    return res.status(500).send('request error');
  }
});

router.delete('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    await categoryService.deleteCategory(categoryId);
    return res.status(201).send('category deleted');
  } catch {
    return res.status(500).send('request error');
  }
});

export default router;
