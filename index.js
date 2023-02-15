const express = require('express')
const app = express()
const port = 3000

const url = 'mongodb://localhost:27017/main'
const mongoose = require('mongoose')

try {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
} catch (error) {
  console.log(error)
}

app.use(express.json())

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  category: String,
  year: String,
  duration: Number,
  director: String,
});

const CatSchema = new mongoose.Schema({
  title: String,
});

const Movie = mongoose.model('Movie', MovieSchema)
const Category = mongoose.model('Movie', CatSchema)

app.get('/', (req, res) => {
  res.send('Hello starda!')
})

app.post('/movie/add', async (req, res) => {
  const {title, year, rating} = req.body
  try {
    const movie = await Movie.create({title, year, rating})
    return res.status(201).send('movie created')
  } catch (error) {
    return res.status(500).send(error)
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})