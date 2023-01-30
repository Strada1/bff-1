const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
require('./routes/movie')(app);
require('./routes/category')(app);
require('./db');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
