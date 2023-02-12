const express = require("express")
const { getDirector, addDirector, removeDirector, updateDirector } = require("../services/directorService");
const { validationResult, body, param } = require("express-validator");
const { validate } = require("../middlewares");
const app = express()

const fieldValidator = body('title').matches(/[a-zA-Zа-яА-Я]/).trim().optional().withMessage('title must contain only letters');

const paramValidator = param('directorId').isMongoId().withMessage('directorId must be MongoId');

const showDirector = app.get('/director', fieldValidator, async (req, res) => {
  try {
    const director = await getDirector();
    return res.status(200).json(director);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createDirector = app.post("/director", fieldValidator, validate(['title']), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await addDirector(req.body);
    return res.status(201).send('Director created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteDirector = app.delete('/director/:directorId', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await removeDirector(req.params.directorId)
    return res.status(201).send('Director deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeDirector = app.put('/director/:directorId', validate(['title']), fieldValidator, paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await updateDirector(req.params.directorId, req.body)
    return res.status(201).send('Director change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createDirector, showDirector, deleteDirector, changeDirector };