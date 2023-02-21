require('dotenv').config();

interface IConfig {
  serverUrl: string;
  port: number;
  mongoUrl: string;
  mongoMainDBName: string;
  mongoTestDBName: string;
  jwtSecret: string;
  allowedOrigins: string[];
}

export const config: IConfig = {
  serverUrl: process.env.SERVER_URL,
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  mongoMainDBName: process.env.MONGO_MAIN_DB_NAME!,
  mongoTestDBName: process.env.MONGO_TEST_DB_NAME!,
  jwtSecret: process.env.JWT_SECRET,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
};
