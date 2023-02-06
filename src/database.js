const url = process.env.MONGO_CONNECTION_STRING;
const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
  title: String,
  genre: { type: 'ObjectId', ref: 'Genres' },
  album: String,
  year: Number,
  duration: Number,
  artist: { type: 'ObjectId', ref: 'Artist' },
});

const GenreSchema = new mongoose.Schema({
  title: String
})

const ReviewSchema = new mongoose.Schema({
  text: String,
  score: Number,
  trackId: {type: 'ObjectId', ref: 'Tracks'},
})

const ArtistSchema = new mongoose.Schema({
  title: String,
})

const Track = new mongoose.model('Track', TrackSchema);
const Review = new mongoose.model('TrackReview', ReviewSchema)
const Genre = new mongoose.model('Genre', GenreSchema);
const Artist = new mongoose.model('Artist', ArtistSchema);


module.exports = {mongoose, Track, Genre, Review, Artist, url}