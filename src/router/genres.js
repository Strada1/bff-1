const express = require('express')
const GENRE = require('../services/genreService')
const router = express.Router()

const {validateStringField, validateParamId} = require('../middleware/routeValidation')

const genreIdLink = '/:genreId';
const validateGenreIdParam = validateParamId('genreId');


router.post('/', validateStringField('title'), async(req, res) => {
    try {
      await GENRE.CREATE(req.body)
      return res.status(201).send('genre added');
    } catch(e) {
      return res.status(501).send('something went wrong')
    }
  })

router.get(genreIdLink, validateGenreIdParam, async (req, res) => {
  try {
    const genreId = req.params.genreId
    const genre = await GENRE.GET(genreId);
    return res.status(201).send(genre)
  } catch(e) {
    return res.status(501).send('something went wrong')
  }
})

router.put(genreIdLink, validateGenreIdParam, async (req, res) => {
  try {
    const genreId = req.params.genreId
    const update = req.body;
    const genre = await GENRE.UPDATE(genreId, update)
    return res.status(201).send('genre updated')
  } catch(e) {
    return res.status(501).send('something went wrong')
  }
})

router.delete(genreIdLink, validateGenreIdParam, async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const genre = await GENRE.DELETE(genreId)
    return res.status(201).send('genre deleted')
  } catch(e) {
    return res.status(501).send('something went wrong')
  }
})


module.exports = router;