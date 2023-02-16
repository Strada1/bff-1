const { Artist } = require('../database');

const ARTIST = {
  GET: (id) => {
    return Artist.findById(id);
  },
  CREATE: (artistInfo) => {
    return Artist.create(artistInfo);
  },
  UPDATE: (id, update) => {
    return Artist.findByIdAndUpdate(id, update);
  },
  DELETE: (id) => {
    return Artist.findByIdAndDelete(id);
  },
};

module.exports = ARTIST;
