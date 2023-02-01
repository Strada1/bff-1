const { default: mongoose } = require("mongoose");

const CategoryScheme = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model("Category", CategoryScheme);
