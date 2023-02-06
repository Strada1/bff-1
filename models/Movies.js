const {Schema, model} = require('../db');

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: 'Directors',
  },
  year: Number,
  duration: Number,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
});
const Movies = model('Movies', moviesSchema);

module.exports = Movies;
