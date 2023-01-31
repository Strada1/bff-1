const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/main';

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
}

module.exports = connectDB;