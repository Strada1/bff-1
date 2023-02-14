require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000/'];
const {connectDB} = require("./db");
const {addRoutes} = require("./routes/routes");
const fs = require('node:fs/promises');
const {Movie} = require("./models");

app.use(cors({
    origin: allowedOrigins,
}))
app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const loadFile = async () => {
    try {
        const file = await fs.readFile('movies.json', { encoding: 'utf8'});
        await Movie.create(file);
        } catch (err) {
            console.log(err);
        }
}

loadFile();

connectDB();
addRoutes(app);







