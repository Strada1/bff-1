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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const categories_model_1 = require("../models/categories.model");
function getCategories() {
    return categories_model_1.Category.find().lean();
}
exports.getCategories = getCategories;
function getCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield categories_model_1.Category.findById(id);
        if (!category) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
        }
        return category;
    });
}
exports.getCategory = getCategory;
function createCategory({ title }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield categories_model_1.Category.create({ title });
        if (!title) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'required fields are missing');
        }
        return category;
    });
}
exports.createCategory = createCategory;
function updateCategory(id, { title }) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield categories_model_1.Category.findByIdAndUpdate(id, { title }, {
            new: true,
        });
        if (!category) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
        }
        return category;
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedCategory = yield categories_model_1.Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
        }
        return deletedCategory;
    });
}
exports.deleteCategory = deleteCategory;
