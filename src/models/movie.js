const { default: mongoose } = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  comments: {
    type: [
      {
        ref: "Comment",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  category: {
    ref: "Category",
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
