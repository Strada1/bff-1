const mongoose = require('../db');

module.exports = {
  async up(db, client) {
    return db.collection('users').updateMany(
      {},
      {
        $set: {
          favorite: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Comments',
            },
          ],
        },
      }
    );
  },

  async down(db, client) {
    return db.collection('users').updateMany({}, {$unset: {favorite: ''}});
  },
};
