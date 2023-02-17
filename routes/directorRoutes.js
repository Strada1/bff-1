const express = require('express');
const router = express.Router();
const { findAllDirectors, createDirector, findAndDelete, findAndUpdate, findItemById } = require('../services/directorService');
const { validate } = require('../middlewares');
const { directorPostValidatorSchema, directorDeleteValidatorSchema, directorEditValidatorSchema } = require('../validatorSchema/director');

router.get('/', async (req, res) => {
  try {
    const directors = await findAllDirectors();
    return res.status(201).send(directors);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:directorId', async (req, res) => {
  const id = req.params.directorId;
  try {
    const director = await findItemById(id);
    return res.status(201).send(director);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/',
  directorPostValidatorSchema,
  validate,
  async (req, res) => {
    try {
      const director = await createDirector({
        name: req.body.name,
        surname: req.body.surname,
        yearOfBirth: req.body.yearOfBirth,
      });
      return res.status(201).send('director created');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.delete('/:directorId',
  directorDeleteValidatorSchema,
  validate,
  async (req, res) => {

    const id = req.params.directorId;
    try {
      const director = await findAndDelete(id);
      return res.status(201).send('director deleted');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.put('/:directorId/edit',
  directorEditValidatorSchema,
  validate,
  async (req, res) => {

    const id = req.params.directorId;
    try {
      const director = await findAndUpdate(id,
        {
          name: req.body.name,
          surname: req.body.surname,
          yearOfBirth: req.body.yearOfBirth,
        },
        { new: true });
      return res.status(201).send(director);
    } catch (err) {
      return res.status(500).send(err);
    }
  });


module.exports = router;