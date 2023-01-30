const url = "mongodb://localhost:27017/strada";
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3001;
const express = require("express");
const app = express();
const movies = require("../routes/movies");

app.use(express.json());

app.use("/movies", movies);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
