require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_CONNECT;

function connectDb() {
  mongoose.set("strictQuery", false);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
}

module.exports = connectDb;
