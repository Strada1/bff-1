module.exports = {
  async up(db, client) {
    return db.collection('users').updateMany({}, {$set: {favorite: []}});
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    return db.collection('users').updateMany({}, {$unset: {favorite: ''}});
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
