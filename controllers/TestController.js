const { ObjectId } = require('mongodb');
const { MovieModal } = require('../models/Movies');
const { DirectorModal } = require('../models/Director');

const getDirectorMoviesCount = (directorId) => DirectorModal.aggregate([
  {
    $match: {
      _id: new ObjectId(directorId),
    },
  },
  {
    $group: {
      _id: directorId,
      requestsCount: {
        $sum: 1,
      },
      moviesCount: {
        $sum: {
          $size: '$movies',
        },
      },
    },
  },
]);

const getMoviesBetweenYears = (gt, lt) => MovieModal.aggregate(
  [
    {
      $match: {
        year: {
          $gt: gt,
          $lt: lt,
        },
      },
    },
    {
      $count: 'movies_count',
    },
  ],
);

module.exports = { getMoviesBetweenYears, getDirectorMoviesCount };
