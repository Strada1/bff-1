"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
// import { errorLog } from './middlewares/errorLog';
const errorHandler_1 = require("./middlewares/errorHandler");
const passportStrategies_1 = require("./middlewares/passportStrategies");
const JSONSyntaxErr = require('json-syntax-error');
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: config_1.config.allowedOrigins,
}), express_1.default.json(), JSONSyntaxErr({ meta: 'bad json' }));
passport_1.default.use(passportStrategies_1.tokenStrategy);
exports.app.use(routes_1.default);
exports.app.use(errorHandler_1.errorHandler);
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(config_1.config.port, () => {
        console.log(`server running at ${config_1.config.serverUrl}:${config_1.config.port}`);
    });
}
