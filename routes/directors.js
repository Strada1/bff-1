import { Router } from 'express';

import directorService from '../services/directorService.js';

const router = Router();

router.get('/:directorId', async (req, res) => {
  const { directorId } = req.params;
  console.log(directorId);
  try {
    const director = await directorService.readDirector(directorId);
    return res.status(201).send(director);
  } catch {
    return res.status(500).send('request error');
  }
});

router.post('/', async (req, res) => {
  try {
    await directorService.createDirector(req.body);
    return res.status(201).send('director created');
  } catch {
    return res.status(500).send('request error');
  }
});

router.put('/:directorId', async (req, res) => {
  const { directorId } = req.params;
  try {
    await directorService.updateDirector(directorId, req.body);
    return res.status(201).send('director update');
  } catch {
    return res.status(500).send('request error');
  }
});

router.delete('/:directorId', async (req, res) => {
  const { directorId } = req.params;
  try {
    await directorService.deleteDirector(directorId);
    return res.status(201).send('director deleted');
  } catch {
    return res.status(500).send('request error');
  }
});

export default router;
