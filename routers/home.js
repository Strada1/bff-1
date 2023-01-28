const {Router} = require('express');
const {PATHS} = require('../constants');
const router = Router();

router.get(PATHS.HOME, (req, res) => {
  res.send('GET request is done.');
});
router.post(PATHS.HOME, (req, res) => {
  res.send('POST request is done.');
});
router.put(PATHS.HOME, (req, res) => {
  res.send('PUT request is done.');
});
router.delete(PATHS.HOME, (req, res) => {
  res.send('DELETE request is done.');
});

module.exports = router;
