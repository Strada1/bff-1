"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.db = mongoose_1.default;
const config_1 = require("../config");
const DBName = process.env.NODE_ENV === 'test'
    ? config_1.config.mongoTestDBName
    : config_1.config.mongoMainDBName;
mongoose_1.default.connect(config_1.config.mongoUrl + DBName).catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
