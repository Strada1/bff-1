"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require('dotenv').config();
exports.config = {
    serverUrl: process.env.SERVER_URL,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
};
