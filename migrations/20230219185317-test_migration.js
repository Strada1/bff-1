module.exports = {
  async up(db) {
    try {
      db.collection('movies').updateMany({}, [
        { $addFields: { description: '$title' } },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  async down(db) {
    try {
      db.collection('movies').updateMany({}, [{ $unset: 'description' }]);
    } catch (err) {
      console.log(err);
    }
  },
};
