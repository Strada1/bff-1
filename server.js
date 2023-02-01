const express = require('express');
const { corsOptions } = require('./cors');
const routers = require('./routes/index');

const app = express();
const port = 3000;

app.use(corsOptions);

app.use(express.json());

app.use(routers);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
