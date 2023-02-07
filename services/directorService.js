const mongoose = require('mongoose');
const Director = require('../models/director.js');

const getDirectors = () => {
  return Director.find({});
};

const addDirector = ({ director, movieId }) => {
  return Director.create({ director, movieId });
};

const updateDirector = (id, { director }) => {
  if (Director.findById(id)) {
    return false;
  }
  return Director.findByIdAndUpdate(id, { director });
};

const deliteDirector = (id) => {
  if (Director.findById(id)) {
    return false;
  }
  return Director.findByIdAndDelete(id);
};

module.exports = { getDirectors, addDirector, updateDirector, deliteDirector };
