require('dotenv').config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/movies", require("./routes/movies"));
app.use("/movies", require("./routes/comments"));
app.use("/categories", require("./routes/categories"));
app.use("/directors", require("./routes/directors"));
app.use((req, res) => {
    res.status(404).json({error: 404, message: "Page not found"});
});

app.listen(port, () => {
    console.log("Server started")
});
