const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({ 
    name: String,
    surname: String,
    yearOfBirth: Number,
  });

const Director = mongoose.model('Director', DirectorSchema); 

module.exports = Director;