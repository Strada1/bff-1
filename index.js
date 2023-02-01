const express = require('express');
const cors = require('cors');

const {SERVER, CORS_OPTIONS} = require('./config');
const app = express();

const homeRoute = require('./routers/home');
const moviesRoute = require('./routers/movies');
const categoriesRoute = require('./routers/categories');

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(homeRoute);
app.use(moviesRoute);
app.use(categoriesRoute);

app.listen(SERVER.PORT, () => {
  console.log(`Example app listen on ${SERVER.PORT} port`);
});
