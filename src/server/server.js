require("dotenv").config();
const url = process.env.MONGO_URL;
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.NODE_ENV === "prod" ? process.env.PORT : 3001;
const cors = require("cors");
const express = require("express");
const app = express();
const movies = require("../routes/movies");
const category = require("../routes/category");
const directors = require("../routes/directors");

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use("/movies", movies);
app.use("/categories", category);
app.use("/directors", directors);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
