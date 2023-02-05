import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import STATUS from 'http-status';
import routes from './routes';
import { config } from './config';

const JSONSyntaxErr = require('json-syntax-error');

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
  }),
  express.json(),
  JSONSyntaxErr({ meta: 'bad json' })
);

app.use(routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.statusCode) {
    return res.status(error.statusCode).send({ meta: error.message });
  }

  if (error.name === 'CastError') {
    return res.status(STATUS.NOT_FOUND).send({ meta: error.message });
  }

  res.status(STATUS.INTERNAL_SERVER_ERROR).send({ error });

  next();
});

app.listen(config.port, () => {
  console.log(`server running at ${config.serverUrl}:${config.port}`);
});
