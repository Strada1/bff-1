module.exports = {
  async up(db, client) {
    return db.collection('movies').updateMany(
      {},
      {
        $set: {
          description: '$title',
        },
      }
    );
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
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
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
