const db = require("../db");

const MovieShema = new db.Schema({
    title: String,
    directorId: {type: "ObjectId", ref: "Director"},
    year: Number,
    duration: Number,
    rating: Number,
    categoryIds: [{type: "ObjectId", ref: "Category"}]
});

const Movie = db.model("Movie", MovieShema);
module.exports = { Movie };
