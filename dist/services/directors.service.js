"use strict";
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
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const director_model_1 = require("../models/director.model");
function getDirectors() {
    return director_model_1.Director.find().lean();
}
exports.getDirectors = getDirectors;
function getDirector(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const director = yield director_model_1.Director.findById(id).lean();
        if (!director) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Director not found');
        }
        return director;
    });
}
exports.getDirector = getDirector;
function createDirector({ firstName, lastName }) {
    if (!firstName || !lastName) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'required fields are missing');
    }
    return director_model_1.Director.create({ firstName, lastName });
}
exports.createDirector = createDirector;
function updateDirector(id, { firstName, lastName }) {
    return __awaiter(this, void 0, void 0, function* () {
        const director = yield director_model_1.Director.findByIdAndUpdate(id, { firstName, lastName }, {
            new: true,
        });
        if (!director) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Director not found');
        }
        return director;
    });
}
exports.updateDirector = updateDirector;
function deleteDirector(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedDirector = yield director_model_1.Director.findByIdAndDelete(id);
        if (!deletedDirector) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Director not found');
        }
        return deletedDirector;
    });
}
exports.deleteDirector = deleteDirector;
