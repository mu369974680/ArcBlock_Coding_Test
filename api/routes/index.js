const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const logger = require('../libs/logger');
const mockBlock = require('./mock.js');
// const https = require('https');

const Cache = require('./cache.js');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/blockchaininfo/:hash', middleware.user(), (req, res) => {
  // console.log(req.params.hash);

  const blockchain = Cache.getData(req.params.hash);

  if (blockchain) {
    logger.info('命中缓存:', req.params.hash);
    // res.json(blockchain);
  } else {
    Cache.setData(mockBlock);
  }

  const copyResult = JSON.parse(JSON.stringify(mockBlock));

  delete copyResult.tx;
  res.json(copyResult);

  //   https
  //     .get(
  //       'https://blockchain.info/rawblock/00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
  //       (response) => {
  //         let result = '';

  //         // called when a data chunk is received.
  //         response.on('data', (chunk) => {
  //           result += chunk;
  //         });

  //         // called when the complete response is received.
  //         response.on('end', () => {
  //           res.json(JSON.parse(result));
  //         });
  //       }
  //     )
  //     .on('error', (error) => {
  //       console.log('Error: ' + error.message);
  //     });
});

router.use('/blockchaintx', middleware.user(), (req, res) => {
  // page index start with 0
  const { page, rowsPerPage } = req.body;
  let blockchain = Cache.getData(req.params.hash);

  if (blockchain) {
    logger.info('命中缓存:', req.params.hash);
    // res.json(blockchain);
  } else {
    Cache.setData(mockBlock);

    blockchain = mockBlock;

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
