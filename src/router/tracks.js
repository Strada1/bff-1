const express = require('express')
const router = express.Router();
const TRACK = require('../services/trackService')

router.post('/', async (req, res) => {
  try {
    await TRACK.CREATE(req.body)
    return res.status(201).send('track added');
  } catch(e) {
    return res.status(501).send('something went wrong')
  }
})

router.route('/:trackId')
  .get(async (req, res) => {
    try {
      const trackId = req.params.trackId; 
      const track = await TRACK.GET(trackId)
      return res.status(201).send(track)
    } catch(e) {
      return res.status(501).send('something went wrong')
    }
  })
  .put(async(req, res) => {
    try {
      const trackId = req.params.trackId;
      const update = req.body;
      const track = await TRACK.UPDATE(trackId, update)
      return res.status(201).send(`track ${track.title} updated`);
    } catch(e) {
      return res.status(501).send('something went wrong')
    }
  })
  .delete(async(req, res) => {
    try {
      const trackId = req.params.trackId;
      const track = await TRACK.DELETE(trackId);
      return res.status(201).send(`track ${track.title} deleted`);
    } catch(e) {
      return res.status(501).send('something went wrong')
    }
  })

  module.exports = router;