const express = require('express');
require('dotenv').config();
const { corsOptions } = require('./cors');
const routers = require('./routes/index');

const app = express();
const port = process.env.APP_PORT;

app.use(corsOptions);

app.use(express.json());

app.use(routers);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
