const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
});

const DirectorModel = mongoose.model("Director", DirectorSchema);

module.exports = DirectorModel;
