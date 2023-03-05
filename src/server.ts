import express from 'express';
import cors from 'cors';
import passport from 'passport';
import routes from './routes';
import { config } from './config';
import { errorLog } from './middlewares/errorLog';
import { errorHandler } from './middlewares/errorHandler';
import { tokenStrategy } from './middlewares/passportStrategies';
import * as chatWss from './chat-wss';
import { wsStart } from './services/socket.service';

const JSONSyntaxErr = require('json-syntax-error');

export const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
  }),
  express.json(),
  JSONSyntaxErr({ meta: 'bad json' })
);

passport.use(tokenStrategy);

app.use(routes);
app.use(errorHandler);

function startServer() {
  app.listen(config.port, () => {
    console.log(`server running at ${config.serverUrl}:${config.port}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  app.use(errorLog);

  startServer();
  wsStart(chatWss.onConnection, config.wsPort);
}
