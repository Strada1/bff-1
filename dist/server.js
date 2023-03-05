"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const errorLog_1 = require("./middlewares/errorLog");
const errorHandler_1 = require("./middlewares/errorHandler");
const passportStrategies_1 = require("./middlewares/passportStrategies");
const chatWss = __importStar(require("./chat-wss"));
const socket_service_1 = require("./services/socket.service");
const JSONSyntaxErr = require('json-syntax-error');
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: config_1.config.allowedOrigins,
}), express_1.default.json(), JSONSyntaxErr({ meta: 'bad json' }));
passport_1.default.use(passportStrategies_1.tokenStrategy);
exports.app.use(routes_1.default);
exports.app.use(errorHandler_1.errorHandler);
function startServer() {
    exports.app.listen(config_1.config.port, () => {
        console.log(`server running at ${config_1.config.serverUrl}:${config_1.config.port}`);
    });
}
if (process.env.NODE_ENV !== 'test') {
    exports.app.use(errorLog_1.errorLog);
    startServer();
    (0, socket_service_1.wsStart)(chatWss.onConnection, config_1.config.wsPort);
}
