const express = require('express');
const app = express();
const port = 3000;
const {getAllMovies, AddMovie, DeleteMovie, EditMovie, CommentsMovie} = require('../bff-1/routes/movieRoutes');
const AddCategory = require('../bff-1/routes/categoryRoutes');
const connectDb = require('../bff-1/db');
const cors = require("cors");

connectDb();

const allowedOrigins = [
  '' // один или несколько хостов
];

app.use(cors({
  origin: allowedOrigins
}));

// Парсить тело запроса
app.use(express.json());

app.use(AddMovie);
app.use(AddCategory);
app.use(getAllMovies);
app.use(DeleteMovie);
app.use(EditMovie);
app.use(CommentsMovie);

app.listen(port, () => {
  console.log(`Server run at ${port}`)
});