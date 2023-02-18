const directorsService = require('../service/db/directorsService');

const getDirectors = async (req, res) => {
  try {
    const allDirectors = await directorsService.getAllDirectors();
    return res.status(200).json(allDirectors);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addDirector = async (req, res) => {
  try {
    await directorsService.addDirector(req.body);
    return res.status(201).send('director added');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateDirector = async (req, res) => {
  try {
    await directorsService.updateDirector(req.params['directorId'], req.body);
    return res.status(201).send('director updated!');
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteDirector = async (req, res) => {
  try {
    await directorsService.deleteDirector(req.params['directorId']);
    return res.status(201).send('director deleted!');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getDirectors,
  addDirector,
  updateDirector,
  deleteDirector,
};
