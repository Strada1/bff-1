const {Schema, model} = require('../db');

const directorsSchema = new Schema({
  firstName: String,
  lastName: String,
});
const Directors = model('Directors', directorsSchema);

module.exports = Directors;
