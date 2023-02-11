"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const defaultOptions = {
    stdTTL: 100,
    checkperiod: 120,
};
class CacheService {
    constructor(options = {}) {
        this.cache = new node_cache_1.default(Object.assign(Object.assign({}, defaultOptions), options));
    }
    has(key) {
        return this.cache.has(key);
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value) {
        return this.cache.set(key, value);
    }
    delete(keys) {
        return this.cache.del(keys);
    }
}
exports.CacheService = CacheService;
