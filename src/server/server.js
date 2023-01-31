const express = require('express');
const app = express();
const connectDB = require("./connectDB");
const { createCategory } = require("./routes/categories");
const { createMovie } = require("./routes/movies");
const port = 3000;

connectDB();
app.use(express.json());

app.use(createCategory)
app.use(createMovie)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

