const url = 'mongodb://localhost:27017/main'; // указываем имя нужной базы
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


