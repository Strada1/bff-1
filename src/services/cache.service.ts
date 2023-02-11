import NodeCache, { Key, Options } from 'node-cache';

const defaultOptions: Options = {
  stdTTL: 100,
  checkperiod: 120,
};

class CacheService {
  cache: NodeCache;

  constructor(options: Options = {}) {
    this.cache = new NodeCache({ ...defaultOptions, ...options });
  }

  has(key: Key): boolean {
    return this.cache.has(key);
  }

  get<T>(key: Key): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: Key, value: T) {
    return this.cache.set(key, value);
  }

  delete(keys: Key | Key[]): number {
    return this.cache.del(keys);
  }
}

export { CacheService };
