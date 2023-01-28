const express = require('express')
const app = express()
const port = 3004

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.json());

const {Movie, Category} = require("./models");

app.post('/movies', async (req, res) => {
    await console.log({req, res})
    await Movie.create(req.body); // добавляем документ
    return res.status(201).send('movie created'); // возвращаем ответ
});

app.post('/categories', async (req, res) => {
    await Category.create(req.body); // добавляем документ
    return res.status(201).send('category created'); // возвращаем ответ
});
