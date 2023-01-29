const mongoose = require('mongoose');
const express = require('express');
const { createCategory } = require('./controllers/CategoriesContoller');
const { createMovie, getAllMovies } = require('./controllers/MoviesContoller');

const app = express();
const port = 3000;

// Подключение к базе данных
const url = 'mongodb://127.0.0.1:27018/main';
mongoose.set('strictQuery', false);
async function main() {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}
main().then(() => {
  console.log('DB connect');
}).catch((err) => {
  console.log('DB error', err);
});

// Express. Парсить телео запроса
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Роут на добавление фильма
app.post('/movies', createMovie);

// Роут на получение всех фильмов
app.get('/movies', getAllMovies);

// Роут на добавление категорий
app.post('/categories', createCategory);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
