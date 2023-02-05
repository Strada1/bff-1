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
exports.deleteCategory = exports.editCategory = exports.createCategory = exports.getCategories = void 0;
const http_status_1 = __importDefault(require("http-status"));
const categories_model_1 = require("../models/categories.model");
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(http_status_1.default.OK).send({ categories: [] });
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.getCategories = getCategories;
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category } = req.body;
            if (!category) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ meta: 'required fields are missing' });
            }
            const createdCategory = yield categories_model_1.Category.create({ category });
            res.status(http_status_1.default.CREATED).send(createdCategory);
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.createCategory = createCategory;
function editCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const updatedCategory = yield categories_model_1.Category.findByIdAndUpdate(categoryId, req.body, {
                new: true,
            });
            res.status(http_status_1.default.OK).send(updatedCategory);
        }
        catch (error) {
            if (error.name === 'CastError') {
                return res.status(http_status_1.default.BAD_REQUEST).send({ meta: 'wrong category id' });
            }
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send();
        }
    });
}
exports.editCategory = editCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            const deletedCategory = yield categories_model_1.Category.findByIdAndDelete(categoryId);
            res.status(http_status_1.default.NO_CONTENT).send(deletedCategory);
        }
        catch (error) {
            if (error.name === 'CastError') {
                return res.status(http_status_1.default.BAD_REQUEST).send({ meta: 'wrong category id' });
            }
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.deleteCategory = deleteCategory;
