import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import routes from './routes';
import { config } from './config';
import { errorLog } from './middlewares/errorLog';
import { errorHandler } from './middlewares/errorHandler';
import * as usersService from './services/users.service';

const JSONSyntaxErr = require('json-syntax-error');

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
  }),
  express.json(),
  JSONSyntaxErr({ meta: 'bad json' })
);

passport.use(
  new Strategy(async (token, done) => {
    try {
      const user = await usersService.getUserByToken(token);

      if (!user) {
        return done(null, false);
      }

      return done(null, user, { scope: 'all' });
    } catch (error) {
      return done(null, false);
    }
  })
);

app.use(routes);
app.use(errorLog, errorHandler);

app.listen(config.port, () => {
  console.log(`server running at ${config.serverUrl}:${config.port}`);
});
