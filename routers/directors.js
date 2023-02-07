const exprees = require('express');
const router = exprees.Router();
const {
  getDirectors,
  addDirector,
  updateDirector,
  deliteDirector,
} = require('../services/directorService.js');
const { body } = require('express-validator');
const validateParams = require('../middlewares/validate.js');

router.get('/', async (req, res) => {
  try {
    const directors = await getDirectors();
    return res.status(200).send(directors);
  } catch (e) {
    return res.status(500).send(`Internal server error: ${e.message}`);
  }
});
router.post(
  '/',
  validateParams([body('director').notEmpty()]),
  async (req, res) => {
    try {
      await addDirector(req.body);
      return res.status(201).send('Director adding');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);
router.put(
  '/:directorId',
  validateParams([body('director').notEmpty()]),
  async (req, res) => {
    try {
      const result = await updateDirector(req.body.id, req.body);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(201).send('Director updated');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);
router.delete(
  '/:directorId',
  validateParams([body('id').notEmpty()]),
  async (req, res) => {
    try {
      const result = await deliteDirector(req.body.id);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(200).send('Director delited');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

module.exports = router;
