const {Track} = require('../database')

const TRACK = {
  GET: (trackId) => {
    return Track.findById(trackId).populate(['genre', 'artist'])
  }, 
  CREATE: (trackInfo) => {
    return Track.create(trackInfo)
  }, 
  UPDATE: (trackId, update) => {
    return Track.findOneAndUpdate(trackId, update)
  }, 
  DELETE: (trackId) => {
    return Track.findByIdAndDelete(trackId)
  }, 
}

module.exports = TRACK;