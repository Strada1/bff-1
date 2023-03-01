const app = require('./app');

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listen on ${process.env.SERVER_PORT} port`);
});
