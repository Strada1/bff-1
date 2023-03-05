/* eslint-disable no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    WS_PORT: number;
    MONGO_URL: string;
    MONGO_MAIN_DB_NAME: string;
    SERVER_URL: string;
    JWT_SECRET: string;
    ALLOWED_ORIGINS: string[];
  }
}
