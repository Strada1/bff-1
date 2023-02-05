const express = require('express');
const app = express();
const port = 3000;
const connectDb = require('../bff-1/db');
const cors = require("cors");

connectDb();

const allowedOrigins = [
  '' // hosts
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

app.use("/movies", require("./routes/movieRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/movies", require("./routes/commentRoutes"));
app.use("/directors", require("./routes/directorRoutes"));

app.listen(port, () => {
  console.log(`Server run at ${port}`)
});