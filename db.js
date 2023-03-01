require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const { ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// local DB
const connectDb = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

//cloud DB
// const connectDb = () => {
//     mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
// }

module.exports = connectDb;
