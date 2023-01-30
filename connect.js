const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27018/main';
mongoose.set('strictQuery', false);
async function connectDb() {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {
  connectDb,
};
