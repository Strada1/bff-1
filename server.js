
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


const {Movie, Category} = require("./models");
const {connectDB} = require("./db");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

connectDB();

app.post('/movies', async (req, res) => {
    try {
        await Movie.create(req.body);
        return res.status(201).send('movie created');
    } catch (err) {
        return res.status(401).send(err);
    }
});

app.post('/categories', async (req, res) => {
    try {
        await Category.create(req.body);
        return res.status(201).send('category created');
    } catch (err) {
        return res.status(401).send(err);
    }
});





// const movie = async () =>  {
//    await Movie.create({title: 'Matrixa', category: 'action', year: 1999, duration: 120, director: 'Vachovsky'});
// }
//
// movie();


