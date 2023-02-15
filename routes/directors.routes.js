const { Router } = require('express');
const {
  createDirector, updateDirector, getAllDirectors, removeDirectors,
} = require('../controllers/DirectorsContoller');

const router = Router();

router
  .get('/directors', getAllDirectors)
  .post('/directors', createDirector)
  .put('/directors/:id', updateDirector)
  .delete('/directors/:id', removeDirectors);

module.exports = router;
