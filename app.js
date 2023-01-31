import express, { json } from 'express';
import cors from 'cors';

import addRoutes from './routes/index.js';
import './connect.js';

const app = express();
const port = 3000;
const allowedOrigins = [''];

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(json());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

addRoutes(app);
