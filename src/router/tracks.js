const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');
const sendError = require('../helpers/sendError');

const {
  validateMongoIdField,
  validateNumericField,
  validateStringField,
  validateParamId,
} = require('../middleware/routeValidation');

const TRACK = require('../services/trackService');

const trackIdLink = '/:trackId';
const trackPostValidation = [
  validateStringField('title'),
  validateMongoIdField('genre'),
  validateStringField('album'),
  validateNumericField('year'),
  validateNumericField('duration'),
  validateMongoIdField('artist'),
];
const trackParamValidation = validateParamId('trackId');

router.post('/', trackPostValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    await TRACK.CREATE(req.body);
    return res.status(201).send('track added');
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

router.get(trackIdLink, trackParamValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const trackId = req.params.trackId;
    const track = await TRACK.GET(trackId);
    return res.status(201).send(track);
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

router.put(trackIdLink, trackParamValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const trackId = req.params.trackId;
    const update = req.body;
    const track = await TRACK.UPDATE(trackId, update);
    return res.status(201).send(`track ${track.title} updated`);
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

router.delete(trackIdLink, trackParamValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    const trackId = req.params.trackId;
    const track = await TRACK.DELETE(trackId);
    return res.status(201).send(`track ${track.title} deleted`);
  } catch (e) {
    return sendError(e.array(), res, 400);
  }
});

module.exports = router;
