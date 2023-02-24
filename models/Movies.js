const {Schema, model} = require('../db');

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  director: {
    type: Schema.Types.ObjectId,
    ref: 'Directors',
  },
  year: {
    type: Number,
    required: true,
  },
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
