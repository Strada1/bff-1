"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require('dotenv').config();
exports.config = {
    serverUrl: process.env.SERVER_URL,
    port: process.env.PORT,
    wsPort: process.env.WS_PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoMainDBName: process.env.MONGO_MAIN_DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    messageLengthLimits: { min: 1, max: 200 },
};
