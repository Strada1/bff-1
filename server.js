require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`server running at ${process.env.PORT}`);
  });
}


module.exports = app;