const express = require('express');
const app = express();
const port = 3000;
const movieRouter = require('./routers/movies.js');
const categoryRouter = require('./routers/categories.js');

app.use(express.json());
app.use('/movies', movieRouter);
app.use('/categories', categoryRouter);

function App() {
  try {
    const url = 'mongodb://localhost:27017/main';
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', false);
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

App();
