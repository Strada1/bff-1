import express from 'express';
import cors from 'cors';
import routes from './routes';
import { config } from './config';
import { errorLog } from './middlewares/errorLog';
import { errorHandler } from './middlewares/errorHandler';

const JSONSyntaxErr = require('json-syntax-error');

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
  }),
  express.json(),
  JSONSyntaxErr({ meta: 'bad json' })
);

console.log();

app.use(routes);
app.use(errorLog, errorHandler);

app.listen(config.port, () => {
  console.log(`server running at ${config.serverUrl}:${config.port}`);
});
