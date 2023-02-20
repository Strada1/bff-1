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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoute = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const commentsController = __importStar(require("../controllers/comments.controller"));
const validate_1 = require("../middlewares/validate");
const comments_model_1 = require("../models/comments.model");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.commentsRoute = router;
router
    .route('/')
    .all((0, validate_1.validate)([...comments_model_1.commentValidation]))
    .get((0, validate_1.validate)([(0, express_validator_1.query)('movieId').optional().isMongoId()]), commentsController.getComments)
    .post((0, validate_1.validate)([(0, express_validator_1.body)('movieId').isMongoId(), (0, express_validator_1.body)('text').exists()]), (0, authenticate_1.authentication)(), commentsController.createComment);
router
    .route('/:commentId')
    .all((0, validate_1.validate)([(0, express_validator_1.param)('commentId').isMongoId(), ...comments_model_1.commentValidation]))
    .get(commentsController.getComment)
    .put((0, authenticate_1.authentication)(), commentsController.updateComment)
    .delete((0, authenticate_1.authentication)(), commentsController.deleteComment);
