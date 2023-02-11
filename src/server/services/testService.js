const MovieModel = require("../models/movie");
const { ObjectId } = require('mongodb')
const DirectorModel = require("../models/director");

const getDirectorMoviesCount = (directorId) => {
  return DirectorModel.aggregate([
    {
      $match: {
        _id: new ObjectId(directorId)
      }
    },
    {
      $group: {
        _id: directorId,
        requestsCount: {
          $sum: 1,
        },
        moviesCount: {
          $sum: {
            $size: '$movies'
          }
        }
      }
    }
  ]);
};

const getMoviesBetweenYears = (gt, lt) => {
  return MovieModel.aggregate(
    [
      {
        $match: {
          year: {
            $gt: gt,
            $lt: lt
          }
        }
      },
      {
        $count: 'movies_count'
      }
    ]
  );
};

module.exports = { getMoviesBetweenYears, getDirectorMoviesCount }