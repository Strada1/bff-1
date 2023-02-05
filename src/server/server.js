const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require("./connectDB");
const { createCategory, deleteCategory, changeCategory, showCategories } = require("./routes/categories");
const { createMovie, showMovies, changeMovie, deleteMovie } = require("./routes/movies");
const { createComment, showComments, deleteComment, changeComment } = require('./routes/comments')
const { showDirector, createDirector, deleteDirector, changeDirector } = require("./routes/director");
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
app.use(changeCategory)
app.use(deleteCategory)
app.use(showCategories)

app.use(createMovie)
app.use(showMovies)
app.use(changeMovie)
app.use(deleteMovie)

app.use(createComment)
app.use(showComments)
app.use(deleteComment)
app.use(changeComment)

app.use(showDirector)
app.use(createDirector)
app.use(changeDirector)
app.use(deleteDirector)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

