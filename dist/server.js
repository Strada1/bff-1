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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const errorLog_1 = require("./middlewares/errorLog");
const errorHandler_1 = require("./middlewares/errorHandler");
const usersService = __importStar(require("./services/users.service"));
const JSONSyntaxErr = require('json-syntax-error');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.config.allowedOrigins,
}), express_1.default.json(), JSONSyntaxErr({ meta: 'bad json' }));
passport_1.default.use(new passport_http_bearer_1.Strategy((token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersService.getUserByToken(token);
        if (!user) {
            return done(null, false);
        }
        return done(null, user, { scope: 'all' });
    }
    catch (error) {
        return done(null, false);
    }
})));
app.use(routes_1.default);
app.use(errorLog_1.errorLog, errorHandler_1.errorHandler);
app.listen(config_1.config.port, () => {
    console.log(`server running at ${config_1.config.serverUrl}:${config_1.config.port}`);
});
