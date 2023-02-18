module.exports = {
  async up(db) {
    try {
      db.collection('users').updateMany({}, [
        { $addFields: { favorites: [] } },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  async down(db) {
    try {
      db.collection('users').updateMany({}, [{ $unset: 'favorites' }]);
    } catch (err) {
      console.log(err);
    }
  },
};
