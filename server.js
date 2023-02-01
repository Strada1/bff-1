const express = require("express");
const app = express();
const connectDb = require("./db");
const cors = require("cors");
const createCategory = require("./route/categoryRoute");
const {
  createMovie,
  getAllMovies,
  editMovie,
  deleteMovie,
  addedComent,
} = require("./route/movieRoute");
const port = 3000;

const allowedOrigins = ["http://localhost:3000"];

connectDb();
app.use(express.json());
app.use(cors(allowedOrigins));

app.use(createCategory);
app.use(getAllMovies);
app.use(createMovie);
app.use(editMovie);
app.use(deleteMovie);
app.use(addedComent);

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
