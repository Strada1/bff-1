const url = "mongodb://localhost:27017/strada";
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3001;
const cors = require("cors");
const express = require("express");
const app = express();
const movies = require("../routes/movies");
const category = require("../routes/category");

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use("/movies", movies);
app.use("/categories", category);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
