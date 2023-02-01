const { mongoose } = require('mongoose');

const url = 'mongodb://127.0.0.1:27018/main';
mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connect');
  }).catch((err) => {
    console.log('DB error', err);
  });

module.exports = mongoose;
