const {Router} = require('express');
const {PATHS} = require('../constants');
const {getAllDirectors, addDirector, updateDirector, deleteCategory} = require('../service/db/directorsService');

const router = Router();

router.get(PATHS.DIRECTORS.ALL, async (req, res) => {
  try {
    const allDirectors = await getAllDirectors();
    return res.status(201).json(allDirectors);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.DIRECTORS.ALL, async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('wrong request body');
    await addDirector(req.body);
    return res.status(201).send('director added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(PATHS.DIRECTORS.BY_ID, async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('wrong request body!');
    if (!req.params['directorId']) return res.status(400).send('wrong request params');
    await updateDirector(req.params['directorId'], req.body);
    return res.status(201).send('director updated!');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete(PATHS.DIRECTORS.BY_ID, async (req, res) => {
  try {
    if (!req.params['directorId']) return res.status(400).send('wrong request params');
    await deleteCategory(req.params['directorId']);
    return res.status(201).send('director deleted!');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
