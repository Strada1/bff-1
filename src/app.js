const {mongoose, url} = require('./database')

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors({origin: 'https://youtube.com'}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;