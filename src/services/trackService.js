const { ObjectId } = require('mongodb');
const { Track } = require('../database');

const TRACK = {
  GET_ALL: ({ filter, sort }) => {
    const query = Track.find({}).populate(['genre', 'artist']);
    if (filter.album) {
      return query.where('album', filter.album);
    } else if (sort.year) {
      return query.sort({ year: sort.year });
    } else {
      return query;
    }
  },
  GET: (trackId) => {
    return Track.findById(trackId).populate(['genre', 'artist']);
  },
  CREATE: (trackInfo) => {
    return Track.create(trackInfo);
  },
  UPDATE: (trackId, update) => {
    return Track.findOneAndUpdate(trackId, update);
  },
  DELETE: (trackId) => {
    return Track.findByIdAndDelete(trackId);
  },
  AGGREGATE_ARTIST: (artist) => {
    const artistId = new ObjectId(artist);
    return Track.aggregate([
      {
        $match: { artist: { $in: [artistId] } },
      },
      {
        $group: {
          _id: '$artist',
          count: { $sum: 1 },
        },
      },
    ]).exec();
  },
  AGGREGATE_DURATION: (from, to) => {
    return Track.aggregate([
      {
        $match: { duration: { $gt: from, $lt: to } },
      },
      {
        $count: `durations`,
      },
    ]);
  },
};

module.exports = TRACK;
