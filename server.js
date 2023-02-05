const express = require("express");
const app = express();
const connectDb = require("./db");
const cors = require("cors");
const {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} = require("./route/categoryRoute");
const {
  createMovie,
  getAllMovies,
  editMovie,
  deleteMovie,
} = require("./route/movieRoute");
const { commentDelete, commentCreate } = require("./route/commentRoute");
const {
  getDirector,
  getAllDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
} = require("./route/directorRoute");
const port = 3000;

const allowedOrigins = ["http://localhost:3000"];

connectDb();
app.use(express.json());
app.use(cors(allowedOrigins));

app.use(createCategory);
app.use(deleteCategory);
app.use(editCategory);
app.use(getAllCategory);
app.use(getAllMovies);
app.use(createMovie);
app.use(editMovie);
app.use(deleteMovie);
app.use(commentDelete);
app.use(commentCreate);
app.use(getDirector);
app.use(getAllDirectors);
app.use(createDirector);
app.use(updateDirector);
app.use(deleteDirector);

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
