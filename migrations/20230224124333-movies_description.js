module.exports = {
  async up(db, client) {
    return db.collection('movies').updateMany({}, [
      {
        $set: {
          description: '$title',
        },
      },
    ]);
  },

  async down(db, client) {
    return db.collection('movies').updateMany(
      {},
      {
        $unset: {
          description: '',
        },
      }
    );
  },
};
