const aggregateService = require('../service/db/example');

const getMoviesCountByDirector = async (req, res) => {
  try {
    const moviesCountByDirector = await aggregateService.getMoviesCountByDirector(req.params['directorId']);
    return res.status(200).json(moviesCountByDirector);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getMoviesCountByYearsInterval = async (req, res) => {
  try {
    const moviesCountByYearInterval = await aggregateService.getMoviesCountByYearsInterval(
      req.body['startYear'],
      req.body['endYear']
    );
    return res.status(200).json(moviesCountByYearInterval);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getMoviesCountByDirector,
  getMoviesCountByYearsInterval,
};
