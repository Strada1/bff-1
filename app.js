import express, { json } from 'express';
import './connect.js';
import addRoutes from './routes.js';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(json());

addRoutes(app);
