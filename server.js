const express = require("express");
const app = express();
const connectDb = require("./db");
const createCategory = require("./route/categoryRoute");
const { createMovie, getAllMovies } = require("./route/movieRoute");
const port = 3000;

connectDb();
app.use(express.json());

app.use(createCategory);
app.use(getAllMovies);
app.use(createMovie);

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
