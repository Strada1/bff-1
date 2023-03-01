module.exports = {
  async up(db, client) {
    try {
      await db.collection('users').updateMany({}, { $set: { favorites: [] } });
    } catch (e) {
      console.log(e);
    }
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $unset: { favorites: 1 } });
  }
};