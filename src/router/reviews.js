const router = require('./tracks');
const {validationResult} = require('express-validator');
const sendError = require('../helpers/sendError')

const { validateParamId, validateNumericField, validateStringField, validateMongoIdField } = require('../middleware/routeValidation')

const REVIEW = require('../services/reviewService');

const reviewIdLink = '/:trackId/reviews/:reviewId';

const reviewParamValidation = [
  validateParamId('trackId'), 
  validateParamId('reviewId')
]
const reviewPostValidation = [
  validateStringField('text'), 
  validateNumericField('score'),
  validateMongoIdField('trackId')
]

router.post('/:trackId/reviews', reviewPostValidation,
  async (req, res) => {
    try {
      validationResult(req).throw()
      const review = req.body;
      await REVIEW.CREATE(review, req.params.trackId);
      return res.status(201).send('track review added');
    } catch(error) {
      return sendError(error.array(), res, 400)
    }
})

router.get(reviewIdLink, reviewParamValidation,
  async (req, res) => {
    try {
      validationResult(req).throw()
      const reviewId = req.params.reviewId;
      const review = await REVIEW.GET(reviewId)
      return res.status(201).send(review)
    } catch(error) {
      return sendError(error.array(), res, 400)
    }
})

router.put(reviewIdLink, reviewParamValidation,
  async (req, res) => {
    try {
      validationResult(req).throw()
      const reviewId = req.params.reviewId;
      const update = req.body;
      await REVIEW.UPDATE(reviewId, update)
      return res.status(201).send('review updated')
    } catch(error) {
      return sendError(error.array(), res, 400)
    }
})

router.delete(reviewIdLink, reviewParamValidation, 
  async(req, res) => {
    try {
      validationResult(req).throw()
      const reviewId = req.params.reviewId;
      await REVIEW.DELETE(reviewId)
      return res.status(201).send('review deleted')
    } catch(error) {
      return sendError(error.array(), res, 400)
    }
})


  module.exports = router;