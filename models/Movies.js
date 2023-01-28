const {db} = require("../db");

const MovieShema = new db.Schema({
    title: String,
    director: String,
    year: Number,
    duration: Number,
    rating: Number,
});

const Movie = db.model("Movie", MovieShema);
module.exports = { Movie };
