const {Schema, model} = require('../db');

const directorsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const Directors = model('Directors', directorsSchema);

module.exports = Directors;
