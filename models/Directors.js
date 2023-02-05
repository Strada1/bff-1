const mongoose = require('../db');
const directorsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const Directors = mongoose.model('Directors', directorsSchema);

module.exports = Directors;
