const mongoose = require('mongoose');
const express = require('express');
const { MovieModal } = require('./models/movies');
const { CategoryModal } = require('./models/categories');

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

// Роут на добавление фильма в БД
app.post('/movies', async (req, res) => {
  try {
    const doc = new MovieModal({
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
    });

    await MovieModal.create(doc); // добавляем документ

    return res.status(201).json({
      message: 'Movies created',
    }); // возвращаем ответ
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Роут на добавление категорий в БД
app.post('/categories', async (req, res) => {
  try {
    const doc = new CategoryModal({
      title: req.body.title,
    });

    await CategoryModal.create(doc); // добавляем документ

    return res.status(201).json({
      message: 'Category created',
    }); // возвращаем ответ
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get('/movies', async (req, res) => {
  try {
    const allMovies = await MovieModal.find(); // получаем все документы
    return res.status(200).json(allMovies); // возвращаем ответ
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
