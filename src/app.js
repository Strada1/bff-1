import express from 'express';
import { connected } from './db/index.js';
import { categoryRouter, moviesRouter } from './routes/index.js';

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017/main';

connected(url);

app.use(express.json());

app.use('/', categoryRouter, moviesRouter);

app.listen(port, () => {
  console.log('server run');
});
