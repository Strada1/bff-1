const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/main';

const connectDB = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('start BD')
  } catch (e) {
    console.log('BD fail!');
  }
}

module.exports = connectDB;