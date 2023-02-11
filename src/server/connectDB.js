require('dotenv').config();
const mongoose = require('mongoose')
const url = process.env.MONGO_CONNECTION_STRING;

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