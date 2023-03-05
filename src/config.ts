require('dotenv').config();

interface IConfig {
  serverUrl: string;
  port: number;
  wsPort: number;
  mongoUrl: string;
  mongoMainDBName: string;
  jwtSecret: string;
  allowedOrigins: string[];
  messageLengthLimits: { min: number; max: number };
}

export const config: IConfig = {
  serverUrl: process.env.SERVER_URL,
  port: process.env.PORT,
  wsPort: process.env.WS_PORT,
  mongoUrl: process.env.MONGO_URL,
  mongoMainDBName: process.env.MONGO_MAIN_DB_NAME!,
  jwtSecret: process.env.JWT_SECRET,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
  messageLengthLimits: { min: 1, max: 200 },
};
