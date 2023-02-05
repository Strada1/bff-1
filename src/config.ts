require('dotenv').config();

interface IConfig {
  serverUrl: string;
  port: number;
  mongoUrl: string;
  allowedOrigins: string[];
}

export const config: IConfig = {
  serverUrl: process.env.SERVER_URL,
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
};
