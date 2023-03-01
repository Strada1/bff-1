const mongoose = require('../db');

module.exports = {
  async up(db, client) {
    return db.collection('users').updateMany(
      {},
      {
        $set: {
          favoriteMovies: [],
        },
      }
    );
  },

  async down(db, client) {
    return db.collection('users').updateMany({}, {$unset: {favorite: ''}});
  },
};
