const express = require('express')
const router = require('./tracks')

const REVIEW = require('../services/reviewService');

router.post('/:trackId/reviews', async (req, res) => {
    try {
      const review = req.body;
      await REVIEW.CREATE(review, req.params.trackId);
      return res.status(201).send('track review added');
    } catch(e) {
      return res.status(501).send('something went wrong')
    }
  })

router.route('/:trackId/reviews/:reviewId')
  .get(async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const review = await REVIEW.GET(reviewId)
      return res.status(201).send(review)
    } catch(e) {
      return res.status(500).send('something went wrong')
    }
  })
  .put(async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const update = req.body;
      await REVIEW.UPDATE(reviewId, update)
      return res.status(201).send('review updated')
    } catch(e) {
      return res.status(500).send('something went wrong')
    }
  })
  .delete(async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      await REVIEW.DELETE(reviewId)
      return res.status(201).send('review deleted')
    } catch(e) {
      return res.status(500).send('something went wrong')
    }
  })


module.exports = router;