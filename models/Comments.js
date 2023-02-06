const mongoose = require('../db');

const commentsSchema = new mongoose.Schema({
  text: String,
  rank: Number,
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies',
  },
});
const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
