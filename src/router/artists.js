const express = require('express')
const ARTIST = require('../services/artistService')
const router = express.Router()


router.post('/', async (req, res) => {
  try {
    const artistInfo = req.body
    await ARTIST.CREATE(artistInfo)
    return res.status(201).send('artist created')
  } catch(e) {
    return res.status(500).send('something went wrong')
  }
})

router.route('/:artistId')
  .get(async (req, res) => {
    try {
      const artistId = req.params.artistId
      const artist = await ARTIST.GET(artistId)
      return res.status(201).send(artist)
    } catch(e) {
      return res.status(500).send('something went wrong')
    }
  })
  .put(async (req, res) => {
    try {
      const artistId = req.params.artistId;
      const update = req.body
      const artist = await ARTIST.UPDATE(artistId, update)
      return res.status(201).send(`artist ${artist.title} was updated`)
    } catch(e) {
      return res.status(500).send('something went wrong')
    }
  })
  .delete(async (req, res) => {
    try {
      const artistId = req.params.artistId
      const artist = await ARTIST.DELETE(artistId)
      return res.status(201).send(`artist ${artist.title} was deleted`)
    } catch(e) {
      return res.status(500).send('something went wrong')
    }
  })

  module.exports = router;