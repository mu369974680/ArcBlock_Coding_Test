/* eslint-disable no-unused-vars */
const middleware = require('@blocklet/sdk/lib/middlewares');
const https = require('https');
const router = require('express').Router();
const logger = require('../libs/logger');
const mockBlock = require('./mock.js');
const Cache = require('./cache.js');

function getBlockchain(hash) {
  return new Promise((resolve, reject) => {
    const blockchain = Cache.getData(hash);

    if (blockchain) {
      resolve(blockchain);
    } else {
      https
        .get(`https://blockchain.info/rawblock/${hash}`, (response) => {
          let result = '';

          // called when a data chunk is received.
          response.on('data', (chunk) => {
            result += chunk;
          });

          // called when the complete response is received.
          response.on('end', () => {
            result = JSON.parse(result);

            Cache.setData(result);
            resolve(result);
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    }
  });
}

// router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/blockchaininfo/:hash', middleware.user(), async (req, res) => {
  // console.log(req.params.hash);

  // let blockchain = Cache.getData(req.params.hash);

  // if (blockchain) {
  //   logger.info('hit cache:', req.params.hash);
  //   // res.json(blockchain);
  // } else {
  const blockchain = await getBlockchain(req.params.hash);
  // blockchain = mockBlock;

  //   Cache.setData(blockchain);
  // }

  const copyResult = JSON.parse(JSON.stringify(blockchain));

  if (copyResult.error === 'not-found-or-invalid-arg') {
    res.json({});
  } else {
    delete copyResult.tx;
    res.json(copyResult);
  }
});

router.use('/blockchaintx', middleware.user(), async (req, res) => {
  // page index start with 0
  const { page, rowsPerPage, hash } = req.body;
  // let blockchain = Cache.getData(hash);

  // if (blockchain) {
  //   logger.info('hit cache:', hash);
  //   // res.json(blockchain);
  // } else {
  const blockchain = await getBlockchain(hash);
  // blockchain = mockBlock;

  //   Cache.setData(blockchain);

  //   // res.json(mockBlock);
  // }

  const startIndex = page * rowsPerPage;
  const endIndex = (page + 1) * rowsPerPage - 1;

  logger.info(startIndex, endIndex);

  const result = {
    page,
    rowsPerPage,
    total: blockchain.tx ? blockchain.tx.length : 0,
    startIndex,
    endIndex,
    rows: blockchain.tx ? blockchain.tx.slice(startIndex, endIndex + 1) : [],
  };

  res.json(result);
});

module.exports = router;
