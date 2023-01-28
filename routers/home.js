const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('GET request is done.');
});
router.post('/', (req, res) => {
  res.send('POST request is done.');
});
router.put('/', (req, res) => {
  res.send('PUT request is done.');
});
router.delete('/', (req, res) => {
  res.send('DELETE request is done.');
});

module.exports = router;
