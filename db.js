require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const connectDb = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDb;
