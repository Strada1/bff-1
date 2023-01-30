const express = require('express');
const app = express();
const port = 3000;
const CreateMovie = require('../movieapp/routes/movieRoutes');
const CreateCategory = require('../movieapp/routes/categoryRoutes');
const connectDb = require('../movieapp/db');

connectDb();

// Парсить тело запроса
app.use(express.json());

app.use(CreateMovie);
app.use(CreateCategory);

app.listen(port, () => {
  console.log(`Server run at ${port}`)
});