const express = require('express');
const app = express();
const port = 3000;
const CreateMovie = require('../bff-1/routes/movieRoutes');
const CreateCategory = require('../bff-1/routes/categoryRoutes');
const connectDb = require('../bff-1/db');

connectDb();

// Парсить тело запроса
app.use(express.json());

app.use(CreateMovie);
app.use(CreateCategory);

app.listen(port, () => {
  console.log(`Server run at ${port}`)
});