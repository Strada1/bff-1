"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const JSONSyntaxErr = require('json-syntax-error');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.config.allowedOrigins,
}), express_1.default.json(), JSONSyntaxErr({ meta: 'bad json' }));
app.use(routes_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    next(error);
});
app.use((error, req, res, next) => {
    if (error.statusCode) {
        return res.status(error.statusCode).send({ meta: error.message });
    }
    if (error.name === 'CastError') {
        return res.status(http_status_1.default.NOT_FOUND).send({ meta: error.message });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({ error });
    next();
});
app.listen(config_1.config.port, () => {
    console.log(`server running at ${config_1.config.serverUrl}:${config_1.config.port}`);
});
