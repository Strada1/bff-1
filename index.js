const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {CORS_OPTIONS} = require('./config');

const app = express();
const homeRoute = require('./routers/home');
const moviesRoute = require('./routers/movies');
const commentsRoute = require('./routers/comments');
const categoriesRoute = require('./routers/categories');
const directorsRoute = require('./routers/directors');
const readMoviesFromFile = require('./service/fs/readMovies');

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(homeRoute);
app.use(moviesRoute);
app.use(commentsRoute);
app.use(categoriesRoute);
app.use(directorsRoute);

readMoviesFromFile();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listen on ${process.env.SERVER_PORT} port`);
});
