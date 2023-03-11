const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();

const mockBlock = require('./block.js');
// const https = require('https');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/blockchain', middleware.user(), (req, res) => {
  res.json(mockBlock);
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

module.exports = router;
