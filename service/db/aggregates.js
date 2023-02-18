const Movies = require('../../models/Movies');
const mongoose = require('../../db');

const getMoviesCountByDirector = async (directorId) => {
  const moviesCount = await Movies.aggregate([
    {
      $match: {
        director: new mongoose.Types.ObjectId(directorId),
      },
    },
    {$group: {_id: directorId, moviesCount: {$sum: 1}}},
  ]);
  return moviesCount;
};

const getMoviesCountByYearsInterval = async (startYear, endYear) => {
  const moviesCount = await Movies.aggregate([
    {
      $match: {
        year: {
          $gte: startYear,
          $lte: endYear,
        },
      },
    },
    {
      $group: {
        _id: 'Year',
        moviesCount: {
          $sum: 1,
        },
      },
    },
  ]);
  return moviesCount;
};

module.exports = {
  getMoviesCountByDirector,
  getMoviesCountByYearsInterval,
};
