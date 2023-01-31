
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000/'];

app.use(cors({
    origin: allowedOrigins,
}))

app.use(express.json());

const {connectDB} = require("./db");
const {addRoutes} = require("./routes");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

connectDB();
addRoutes(app);







