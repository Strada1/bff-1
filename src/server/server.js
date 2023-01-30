const express = require('express');
const addRoutes = require("./routes");
const app = express();
const port = 3000;

app.use(express.json());

addRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports = app
