const express = require('express');
const { createCategory } = require('./controllers/CategoriesContoller');
const { createMovie, getAllMovies } = require('./controllers/MoviesContoller');
const { connectDb } = require('./connect');

const app = express();
const port = 3000;

app.use(express.json());

connectDb().then(() => {
  console.log('DB connect');
}).catch((err) => {
  console.log('DB error', err);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/movies', createMovie);

app.get('/movies', getAllMovies);

app.post('/categories', createCategory);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
