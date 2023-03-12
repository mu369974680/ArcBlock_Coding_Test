function Cache() {
  this.cacheData = null;
}
Cache.setData = (blockchain) => {
  if (!this.cacheData) {
    this.cacheData = new Cache();
  }
  if (blockchain.hash) {
    this.cacheData[blockchain.hash] = blockchain;
  }
};

Cache.getData = (hash) => {
  if (!this.cacheData) {
    this.cacheData = new Cache();
  }
  return this.cacheData[hash];
};

module.exports = Cache;
