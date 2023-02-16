const express = require('express');
const ARTIST = require('../services/artistService');
const router = express.Router();
const { validationResult } = require('express-validator');
const sendError = require('../helpers/sendError');
const {
  validateStringField,
  validateParamId,
} = require('../middleware/routeValidation');

const artistIdLink = '/:artistId';

const reviewPostValidation = validateStringField('title');
const reviewParamValidation = validateParamId('reviewId');

router.post('/', reviewPostValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const artistInfo = req.body;
    await ARTIST.CREATE(artistInfo);
    return res.status(201).send('artist created');
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

router.get(artistIdLink, reviewParamValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const artistId = req.params.artistId;
    const artist = await ARTIST.GET(artistId);
    return res.status(201).send(artist);
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

router.put(artistIdLink, reviewParamValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const artistId = req.params.artistId;
    const update = req.body;
    const artist = await ARTIST.UPDATE(artistId, update);
    return res.status(201).send(`artist ${artist.title} was updated`);
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

router.delete(artistIdLink, reviewParamValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const artistId = req.params.artistId;
    const artist = await ARTIST.DELETE(artistId);
    return res.status(201).send(`artist ${artist.title} was deleted`);
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

module.exports = router;
