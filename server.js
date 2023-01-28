const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

const { connectDB } = require("./db");
const { Movie } = require("./models/Movies");
const { Category } = require("./models/Categories");
connectDB();



app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        if (movies.length > 0) {
            res.status(200).send(movies)
        } else {
            res.status(204).send([]);
        }
    } catch(e) {
        res.status(500).send("error when receiving movies")
    }
});

app.post("/add-movie", async (req, res) => {
    try {
        const rs = req.body;
        if (rs?.title && rs?.director && rs?.year && rs?.duration && rs?.rating) {
            await Movie.create(rs);
            res.status(201).send("Movies added");
        } else {
            throw new Error("Incomplete information");
        }
    }
    catch(e) {
        if (e.message == "Incomplete information") {
            res.status(400).send(e.message);
        } else {
            res.status(500).send("Error when adding a movie");
        }
    }
});



app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length > 0) {
            res.status(200).send(categories);
        } else {
            res.status(204).send([]);
        }
    } catch(e) {
        res.status(500).send("Error when receiving categories");
    }
});

app.post("/add-category", async (req, res) => {
    try {
        const rs = req.body;
        if (rs?.title) {
            await Category.create(rs);
            res.status(201).send("Category added");
        } else {
            throw new Error("Incomplete information");
        }
    } catch(e) {
        if (e.message === "Incomplete information") {
            res.status(400).send(e.message);
        } else {
            res.status(500).send("error when adding a movie");
        }
    }
});


app.listen(port, () => {
    console.log("Server started")
});
