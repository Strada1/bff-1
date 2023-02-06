const {Schema, model} = require('../db');

const commentsSchema = new Schema({
  text: String,
  rank: Number,
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movies',
    required: true,
  },
});
const Comments = model('Comments', commentsSchema);

module.exports = Comments;
