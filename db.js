
require('dotenv').config();
const url = process.env.MONGO_URL;

const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = {
    connectDB
}
