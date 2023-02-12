const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require("./connectDB");
const { createCategory, deleteCategory, changeCategory, showCategories } = require("./routes/categories");
const { createMovie, showMovies, changeMovie, deleteMovie } = require("./routes/movies");
const { createComment, showComments, deleteComment, changeComment, showAllComments } = require('./routes/comments')
const { showDirector, createDirector, deleteDirector, changeDirector } = require("./routes/director");
const { uploadFileToDB } = require("./services/uploadFileToDB");
const { getDirectorForId, getMoviesCount } = require("./routes/testRoute");

connectDB();

const allowedOrigins = [
  `http://localhost:${process.env.PORT}`
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

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
app.use(showAllComments)

app.use(showDirector)
app.use(createDirector)
app.use(changeDirector)
app.use(deleteDirector)

app.use(getDirectorForId)
app.use(getMoviesCount)


app.listen(process.env.PORT, async () => {
  // await uploadFileToDB('./movies.json')
  console.log(`Example app listening on port ${process.env.PORT}`)
});

