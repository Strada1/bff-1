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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const http_status_1 = __importDefault(require("http-status"));
const categoriesService = __importStar(require("../services/categories.service"));
function getCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield categoriesService.getCategories();
            res.status(http_status_1.default.OK).send(categories);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getCategories = getCategories;
function getCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const category = yield categoriesService.getCategory(categoryId);
            res.status(http_status_1.default.OK).send(category);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getCategory = getCategory;
function createCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdCategory = yield categoriesService.createCategory(req.body);
            res.status(http_status_1.default.CREATED).send(createdCategory);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createCategory = createCategory;
function updateCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const updatedCategory = yield categoriesService.updateCategory(categoryId, req.body);
            res.status(http_status_1.default.OK).send(updatedCategory);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            yield categoriesService.deleteCategory(categoryId);
            res.status(http_status_1.default.NO_CONTENT).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteCategory = deleteCategory;
