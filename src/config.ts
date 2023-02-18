import { Options } from 'express-rate-limit';
import Mili from 'miliseconds';

require('dotenv').config();

interface IConfig {
  serverUrl: string;
  port: number;
  mongoUrl: string;
  jwtSecret: string;
  allowedOrigins: string[];
  rateLimits: {
    [key: string]: Partial<Options>;
  };
}

export const config: IConfig = {
  serverUrl: process.env.SERVER_URL,
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
  rateLimits: {
    comments: { windowMs: new Mili().hours(1).value(), max: 100 },
    registration: { windowMs: new Mili().hours(1).value(), max: 10 },
    authentication: {
      windowMs: new Mili().hours(1).value(),
      max: 20,
      skipSuccessfulRequests: true,
    },
  },
};
