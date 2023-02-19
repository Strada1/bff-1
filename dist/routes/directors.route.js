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
exports.directorsRoute = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authorization_1 = require("../middlewares/authorization");
const directorsController = __importStar(require("../controllers/directors.controller"));
const validate_1 = require("../middlewares/validate");
const director_model_1 = require("../models/director.model");
const const_1 = require("../shared/const");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.directorsRoute = router;
router
    .route('/')
    .all((0, validate_1.validate)([...director_model_1.directorValidation]))
    .get(directorsController.getDirectors)
    .post((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), (0, validate_1.validate)([(0, express_validator_1.body)('firstName').exists(), (0, express_validator_1.body)('lastName').exists()]), directorsController.createDirector);
router
    .route('/:directorId')
    .all((0, validate_1.validate)([(0, express_validator_1.param)('directorId').isMongoId(), ...director_model_1.directorValidation]))
    .get(directorsController.getDirector)
    .put((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), directorsController.updateDirector)
    .delete((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), directorsController.deleteDirector);
