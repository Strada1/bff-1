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
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComment = exports.getComments = void 0;
const http_status_1 = __importDefault(require("http-status"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moviesService = __importStar(require("../services/movies.service"));
const commentsService = __importStar(require("../services/comments.service"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
exports.getComments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.query;
    const comments = yield commentsService.getComments({
        movieId,
    });
    res.status(http_status_1.default.OK).send({ comments });
}));
exports.getComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const comment = yield commentsService.getComment(commentId);
    if (!comment) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    res.status(http_status_1.default.OK).send(comment);
}));
exports.createComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, text } = req.body;
    const linkedMovie = yield moviesService.getMovie(movieId);
    if (!linkedMovie) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
    }
    const createdComment = yield commentsService.createComment({
        movie: movieId,
        text,
    });
    yield moviesService.addComment(movieId, createdComment._id);
    res.status(http_status_1.default.CREATED).send(createdComment);
}));
exports.updateComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const { text } = req.body;
    const updatedComment = yield commentsService.updateComment(commentId, {
        text,
    });
    if (!updatedComment) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    res.status(http_status_1.default.OK).send(updatedComment);
}));
exports.deleteComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const deletedComment = yield commentsService.deleteComment(commentId);
    if (!deletedComment) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    yield moviesService.deleteComment(deletedComment.movie, deletedComment._id);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
