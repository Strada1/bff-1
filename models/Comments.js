const {Schema, model} = require('../db');

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  rank: Number,
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movies',
    required: true,
  },
});
const Comments = model('Comments', commentsSchema);

module.exports = Comments;
