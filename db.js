const url = 'mongodb://localhost:27017/main';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(url, options, () => console.log('Connected to MongoDB'));

module.exports = mongoose;
