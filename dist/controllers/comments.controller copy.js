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
exports.deleteComment = exports.editComment = exports.createComment = exports.getComments = exports.getComment = void 0;
const http_status_1 = __importDefault(require("http-status"));
const moviesService = __importStar(require("../services/movies.service"));
const commentsService = __importStar(require("../services/comments.service"));
function getComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            const comment = yield commentsService.getCommentById(commentId);
            if (!comment) {
                return res.status(http_status_1.default.NOT_FOUND).send({});
            }
            res.status(http_status_1.default.OK).send(comment);
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.getComment = getComment;
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId } = req.query;
            const comments = yield commentsService.getComments({
                movieId,
            });
            res.status(http_status_1.default.OK).send({ comments });
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.getComments = getComments;
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId, text } = req.body;
            if (!movieId || !text) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ meta: 'required fields are missing' });
            }
            const createdComment = yield commentsService.createComment(movieId, req.body);
            yield moviesService.addCommentToMovie(movieId, createdComment._id);
            res.status(http_status_1.default.CREATED).send(createdComment);
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(http_status_1.default.BAD_REQUEST).send({ meta: 'wrong movie id' });
            }
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.createComment = createComment;
function editComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            const editedComment = yield commentsService.editComment(commentId, req.body);
            if (!editedComment) {
                return res.status(http_status_1.default.BAD_REQUEST).send({ meta: 'wrong comment id' });
            }
            res.status(http_status_1.default.OK).send(editedComment);
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.editComment = editComment;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            const deletedComment = yield commentsService.deleteComment(commentId);
            if (!deletedComment) {
                return res.status(http_status_1.default.BAD_REQUEST).send({ meta: 'wrong comment id' });
            }
            res.status(http_status_1.default.NO_CONTENT).send();
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.deleteComment = deleteComment;
