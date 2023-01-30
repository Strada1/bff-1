// Подключение к базе данных
const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');

const conectDb = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = conectDb;
