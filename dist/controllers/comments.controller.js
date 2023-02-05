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
const moviesService = __importStar(require("../services/movies.service"));
const commentsService = __importStar(require("../services/comments.service"));
function getComments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId } = req.query;
            const comments = yield commentsService.getComments({
                movieId,
            });
            res.status(http_status_1.default.OK).send({ comments });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getComments = getComments;
function getComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            const comment = yield commentsService.getComment(commentId);
            res.status(http_status_1.default.OK).send(comment);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getComment = getComment;
function createComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId } = req.body;
            const createdComment = yield commentsService.createComment(movieId, req.body);
            yield moviesService.addComment(movieId, createdComment._id);
            res.status(http_status_1.default.CREATED).send(createdComment);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createComment = createComment;
function updateComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            const editedComment = yield commentsService.updateComment(commentId, req.body);
            res.status(http_status_1.default.OK).send(editedComment);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateComment = updateComment;
function deleteComment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            yield commentsService.deleteComment(commentId);
            res.status(http_status_1.default.NO_CONTENT).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteComment = deleteComment;
