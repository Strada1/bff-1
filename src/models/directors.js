const { default: mongoose } = require("mongoose");

const DirectorScheme = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Director", DirectorScheme);
