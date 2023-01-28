import express from 'express';
import cors from 'cors';
import routes from './routes';
import { config } from './config';

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
  }),
  express.json()
);

app.use(routes);

app.listen(config.port, () => {
  console.log(`server running at ${config.serverUrl}:${config.port}`);
});
