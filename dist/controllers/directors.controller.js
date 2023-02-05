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
exports.deleteDirector = exports.updateDirector = exports.createDirector = exports.getDirector = exports.getDirectors = void 0;
const http_status_1 = __importDefault(require("http-status"));
const directorsService = __importStar(require("../services/directors.service"));
function getDirectors(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const directors = yield directorsService.getDirectors();
            res.status(http_status_1.default.OK).send(directors);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getDirectors = getDirectors;
function getDirector(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { directorId } = req.params;
            const director = yield directorsService.getDirector(directorId);
            res.status(http_status_1.default.OK).send(director);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getDirector = getDirector;
function createDirector(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdDirector = yield directorsService.createDirector(req.body);
            res.status(http_status_1.default.CREATED).send(createdDirector);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createDirector = createDirector;
function updateDirector(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { directorId } = req.params;
            const updatedDirector = yield directorsService.updateDirector(directorId, req.body);
            res.status(http_status_1.default.OK).send(updatedDirector);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateDirector = updateDirector;
function deleteDirector(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { directorId } = req.params;
            yield directorsService.deleteDirector(directorId);
            res.status(http_status_1.default.NO_CONTENT).send({});
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteDirector = deleteDirector;
