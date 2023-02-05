const mongoose = require('mongoose')

const DirectorSchema = new mongoose.Schema({
  title: String,
});

const DirectorModel = mongoose.model('Director', DirectorSchema);

module.exports = DirectorModel