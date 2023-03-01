module.exports = {
  async up(db, client) {
    try {
      await db.collection('movies').updateMany(
        {},
        [
          {
            $set: {
              description: '$title',
            }
          }
        ]
      )
    } catch (e) {
      console.log(e)
    }
  },

  async down(db, client) {
    try {
      await db.collection('movies').updateMany({}, { $unset: { description: 1 } });
    } catch (e) {
      console.log(e)
    }
  }
};
