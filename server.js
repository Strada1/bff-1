require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors());

app.use(express.json());

 app.use("/users", require("./routes/users"));
 app.use("/chats", require("./routes/chats"));
 app.use("/messages", require("./routes/messages"));


if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`server running at ${process.env.PORT}`);
  });
}


module.exports = app;