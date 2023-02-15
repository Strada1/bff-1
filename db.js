require('dotenv').config();
const { mongoose } = require('mongoose');

const url = process.env.MONGO_CONNECTION_STRING;
mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connect');
  }).catch((err) => {
    console.log('DB error', err);
  });

module.exports = mongoose;
