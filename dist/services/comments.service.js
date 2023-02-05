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
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComment = exports.getComments = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const comments_model_1 = require("../models/comments.model");
function getComments(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = comments_model_1.Comment.find().lean();
        if (options.movieId) {
            query.where('movie', options.movieId);
        }
        return query;
    });
}
exports.getComments = getComments;
function getComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comments_model_1.Comment.findById(id);
        if (!comment) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
        }
        return comment;
    });
}
exports.getComment = getComment;
function createComment(id, { text }) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comments_model_1.Comment.create({ text, movie: id });
        if (!text || !id) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'required fields are missing');
        }
        return comment;
    });
}
exports.createComment = createComment;
function updateComment(id, { movie, text }) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comments_model_1.Comment.findByIdAndUpdate(id, { movie, text }, {
            new: true,
        });
        if (!comment) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
        }
        return comment;
    });
}
exports.updateComment = updateComment;
function deleteComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedComment = yield comments_model_1.Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
        }
        return deletedComment;
    });
}
exports.deleteComment = deleteComment;
