const {Movies, Categories} = require('./db');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('GET request is done.');
});
app.post('/', (req, res) => {
  res.send('POST request is done.');
});
app.put('/', (req, res) => {
  res.send('PUT request is done.');
});
app.delete('/', (req, res) => {
  res.send('DELETE request is done.');
});

app.post('/movies', async (req, res) => {
  try {
    await Movies.create(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.post('/categories', async (req, res) => {
  try {
    await Categories.create(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listen on ${port} port`);
});
