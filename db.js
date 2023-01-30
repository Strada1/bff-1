const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/main";

function connectDb() {
  mongoose.set("strictQuery", false);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
}

module.exports = connectDb;
