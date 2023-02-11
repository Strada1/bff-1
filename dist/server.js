"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const errorLog_1 = require("./middlewares/errorLog");
const errorHandler_1 = require("./middlewares/errorHandler");
const JSONSyntaxErr = require('json-syntax-error');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.config.allowedOrigins,
}), express_1.default.json(), JSONSyntaxErr({ meta: 'bad json' }));
app.use(routes_1.default);
app.use(errorLog_1.errorLog, errorHandler_1.errorHandler);
app.listen(config_1.config.port, () => {
    console.log(`server running at ${config_1.config.serverUrl}:${config_1.config.port}`);
});
