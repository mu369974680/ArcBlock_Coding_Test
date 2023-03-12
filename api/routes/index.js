/* eslint-disable no-unused-vars */
const middleware = require('@blocklet/sdk/lib/middlewares');
const https = require('https');
const router = require('express').Router();
const logger = require('../libs/logger');
const mockBlock = require('./mock.js');
const Cache = require('./cache.js');

function getBlockchain(hash) {
  return new Promise((resolve, reject) => {
    https
      .get(`https://blockchain.info/rawblock/${hash}`, (response) => {
        let result = '';

        // called when a data chunk is received.
        response.on('data', (chunk) => {
          result += chunk;
        });

        // called when the complete response is received.
        response.on('end', () => {
          resolve(JSON.parse(result));
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/blockchaininfo/:hash', middleware.user(), async (req, res) => {
  // console.log(req.params.hash);

  let blockchain = Cache.getData(req.params.hash);

  if (blockchain) {
    logger.info('hit cache:', req.params.hash);
    // res.json(blockchain);
  } else {
    // blockchain = await getBlockchain(req.params.hash);
    blockchain = mockBlock;

    Cache.setData(blockchain);
  }

  const copyResult = JSON.parse(JSON.stringify(blockchain));

  delete copyResult.tx;
  res.json(copyResult);
});

router.use('/blockchaintx', middleware.user(), async (req, res) => {
  // page index start with 0
  const { page, rowsPerPage } = req.body;
  let blockchain = Cache.getData(req.params.hash);

  if (blockchain) {
    logger.info('命中缓存:', req.params.hash);
    // res.json(blockchain);
  } else {
    // blockchain = await getBlockchain(req.params.hash);

    blockchain = mockBlock;
    Cache.setData(blockchain);

    // res.json(mockBlock);
  }

  const startIndex = page * rowsPerPage;
  const endIndex = (page + 1) * rowsPerPage - 1;

  logger.info(startIndex, endIndex);

  const result = {
    page,
    rowsPerPage,
    total: blockchain.tx.length,
    startIndex,
    endIndex,
    rows: blockchain.tx.slice(startIndex, endIndex + 1),
  };

  res.json(result);
});

module.exports = router;
