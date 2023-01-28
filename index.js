const express = require('express');
const app = express();

const homeRoute = require('./routers/home');
const moviesRoute = require('./routers/movies');
const categoriesRoute = require('./routers/categories');

const port = 3000;

app.use(express.json());

app.use(homeRoute);
app.use(moviesRoute);
app.use(categoriesRoute);

app.listen(port, () => {
  console.log(`Example app listen on ${port} port`);
});
