const mongoose = require('mongoose');

const URL_BASE = 'mongodb://127.0.0.1:27017/main';
const connectBase = () => mongoose.connect(URL_BASE, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });

module.exports = { connectBase };
