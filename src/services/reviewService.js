const { Review } = require('../database');

const REVIEW = {
  GET: (id) => {
    return Review.findById(id).populate('trackId');
  },
  CREATE: (reviewInfo, trackId) => {
    reviewInfo.trackId = trackId;
    return Review.create(reviewInfo);
  },
  UPDATE: (id, update) => {
    return Review.findByIdAndUpdate(id, update);
  },
  DELETE: (id) => {
    return Review.findByIdAndDelete(id);
  },
};

module.exports = REVIEW;
