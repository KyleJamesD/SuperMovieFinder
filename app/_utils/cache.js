class SimpleCache {
    constructor() {
      this.cache = new Map();
    }
  
    get(key) {
      const item = this.cache.get(key);
      if (!item) return null;
  
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }
      return item.value;
    }
  
    set(key, value, ttl) {
      const expiry = Date.now() + ttl * 1000;
      this.cache.set(key, { value, expiry });
    }
  }
  
  export const cache = new SimpleCache();