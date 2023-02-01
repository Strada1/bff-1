const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require("./connectDB");
const { createCategory } = require("./routes/categories");
const { createMovie, showMovies, changeMovie, deleteMovie } = require("./routes/movies");
const port = 3000;

connectDB();
app.use(express.json());

const allowedOrigins = [
  `http://localhost:${port}`
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(createCategory)
app.use(createMovie)
app.use(showMovies)
app.use(changeMovie)
app.use(deleteMovie)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

