const express = require('express');
const cors = require('cors');

const {SERVER, CORS_OPTIONS} = require('./config');
const app = express();

const homeRoute = require('./routers/home');
const moviesRoute = require('./routers/movies');
const commentsRoute = require('./routers/comments');
const categoriesRoute = require('./routers/categories');
const directorsRoute = require('./routers/directors');

app.use(express.json());
app.use(cors(CORS_OPTIONS));

app.use(homeRoute);
app.use(moviesRoute);
app.use(commentsRoute);
app.use(categoriesRoute);
app.use(directorsRoute);

app.listen(SERVER.PORT, () => {
  console.log(`Example app listen on ${SERVER.PORT} port`);
});
