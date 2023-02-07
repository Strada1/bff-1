const url_base = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoConnect = mongoose.connect(url_base, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoConnect;
