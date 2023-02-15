const mongoose = require('../db');

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const DirectorModal = mongoose.model('Director', DirectorSchema);

module.exports = {
  DirectorModal,
};
