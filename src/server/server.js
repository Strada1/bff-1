const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require("./connectDB");

connectDB();

const allowedOrigins = [
  `http://localhost:${process.env.PORT}`
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());



module.exports = app.listen(process.env.PORT, async () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});
