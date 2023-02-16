const { Genre } = require('../database');

const GENRE = {
  GET: (id) => {
    return Genre.findById(id);
  },
  CREATE: (genreInfo) => {
    return Genre.create(genreInfo);
  },
  UPDATE: (id, update) => {
    return Genre.findByIdAndUpdate(id, update);
  },
  DELETE: (id) => {
    return Genre.findByIdAndDelete(id);
  },
};

module.exports = GENRE;
