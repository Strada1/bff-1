
express = require("express");
mongoose = require('mongoose');
exports.app=express();
exports.port=7000;

const url = 'mongodb://localhost:27017/main';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
