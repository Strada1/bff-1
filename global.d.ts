/* eslint-disable no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    MONGO_URL: string;
    SERVER_URL: string;
    JWT_SECRET: string;
    ALLOWED_ORIGINS: string[];
  }
}
