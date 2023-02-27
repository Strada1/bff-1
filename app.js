const express = require('express');

const cors = require('cors');
const {CORS_OPTIONS} = require('./config');

const app = express();
const loginRoute = require('./routers/login');
const homeRoute = require('./routers/home');
const usersRoute = require('./routers/users');
const moviesRoute = require('./routers/movies');
const commentsRoute = require('./routers/comments');
const categoriesRoute = require('./routers/categories');
const directorsRoute = require('./routers/directors');
const exampleRoute = require('./routers/example');

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(loginRoute);
app.use(homeRoute);
// app.use(usersRoute);
app.use(moviesRoute);
app.use(commentsRoute);
app.use(categoriesRoute);
app.use(directorsRoute);
app.use(exampleRoute);

module.exports = app;
