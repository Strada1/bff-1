const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
  title: String,
  category: { type: 'ObjectId', ref: 'Categories' },
  album: String,
  year: Number,
  duration: Number,
  artist: String,
});

const CategorySchema = new mongoose.Schema({
  title: String
})

const Track = new mongoose.model('Track', TrackSchema);
const Category = new mongoose.model('Category', CategorySchema);


module.exports = {mongoose, Track, Category, url}