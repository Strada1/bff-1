const express = require('express');
const {SERVER} = require('./config');
const app = express();

const homeRoute = require('./routers/home');
const schemaRoute = require('./routers/schema');
const moviesRoute = require('./routers/movies');
const categoriesRoute = require('./routers/categories');

app.use(express.json());

app.use(homeRoute);
app.use(schemaRoute);
app.use(moviesRoute);
app.use(categoriesRoute);

app.listen(SERVER.PORT, () => {
  console.log(`Example app listen on ${SERVER.PORT} port`);
});
