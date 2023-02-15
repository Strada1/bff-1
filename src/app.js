require('dotenv').config({ path: '../index.env' });
const {mongoose, url} = require('./database')
const tracks = require('./router/tracks')
const genres = require('./router/genres')
const artist = require('./router/artists')
const review = require('./router/reviews')

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({origin: 'https://youtube.com'}))
app.use('/tracks', [tracks, review])
app.use('/genres', genres)
app.use('/artist', artist)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;