const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const movieRouter = require('./routers/movies.js');
const categoryRouter = require('./routers/categories.js');
const commentRouter = require('./routers/comments.js');
const directorRouter = require('./routers/directors.js');
const mongoConnect = require('./connect.js');
const allowedOrigins = ['http://localhost:3000/'];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use('/movies', movieRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);
app.use('/directors', directorRouter);

function App() {
  try {
    mongoConnect;
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

App();
