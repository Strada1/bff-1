const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({ // определяем схему
    title: {
        type: String,
        required: true,
    },
    year: Number,
    rating: Number,
    duration: Number,
    director: String,
});
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
}, { versionKey: '_somethingElse' })

const Movie = mongoose.model('Movie', MovieSchema); // создаем модель по схеме
const Category = mongoose.model('Category', CategorySchema)

module.exports = {Movie, Category}
