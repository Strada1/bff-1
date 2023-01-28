const url = 'mongodb://localhost:27017/main';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.set('strictQuery', false);
mongoose.connect(url, options, () => console.log('Connected to MongoDB'));

const MoviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: String,
  year: Number,
  duration: Number,
  director: String,
});

const CategoriesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Movies = mongoose.model('Movies', MoviesSchema);
const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = {
  Movies,
  Categories,
};
