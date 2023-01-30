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
    category: {
        type: 'ObjectId',
        ref: 'Category'
    }
});

const Movie = mongoose.model('Movie', MovieSchema); // создаем модель по схеме


module.exports = {Movie}
