require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('../bff-1/db');
const cors = require("cors");
const port = process.env.PORT;
const {manualAuthentication} = require('../bff-1/middlewares/index') //manual authentication
const passport = require('./helpers/passport')

const fileReading = require('../bff-1/fs');
//fileReading();

connectDb();

const allowedOrigins = [
  'http://localhost:3000/'
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

//app.use(manualAuthentication)


app.use("/movies", require("./routes/movieRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/movies", require("./routes/commentRoutes"));
app.use("/directors", require("./routes/directorRoutes"));
app.use("/aggregate", require("./routes/aggregate"));
app.use("/users", require("./routes/userRoutes"));


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`server running at ${port}`);
  });
}


module.exports = app;