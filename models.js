const url = 'mongodb://localhost:27017/main'; // указываем имя нужной базы
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const MovieSchema = new mongoose.Schema({ // определяем схему
    title: String,
    category: String,
    year: Number,
    duration: Number,
    director: String,
    rating: Number,
});

const Movie = mongoose.model('movies', MovieSchema); // создаем модель по схеме

const CategorySchema = new mongoose.Schema({ // определяем схему
    title: String,
});

const Category = mongoose.model('categories', CategorySchema); // создаем модель по схеме


module.exports = {Movie, Category};

