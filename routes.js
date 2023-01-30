const express = require("express");
const { starting, getMovies, getCategories, postMovies, postCategories } = require("./controllers");

const app = express();
app.use(express.json());

app.get("/", starting);
app.get("/movies", getMovies);
app.post("/movies", postMovies);
app.get("/categories", getCategories);
app.post("/categories", postCategories);

module.exports = { app };
