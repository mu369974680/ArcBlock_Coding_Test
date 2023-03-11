import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TxTable from '../components/tx-table';
import BlockInfo from '../components/block-info';
// import { useState } from 'react';
// import axios from '../libs/api.js';

function Query() {
  // useEffect(() => {
  //   axios
  //     .post('/api/user')
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // axios
  //   .post('/api/blockchaininfo/00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
  //   .then((response) => {
  //     // console.log(response);
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //   });

  // axios
  //   .post('/api/blockchaintx', { page: 1 })
  //   .then((response) => {
  //     // console.log(response);
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //   });

  return (
    <div>
      <h1>
        <Link className="app-link" to="/">
          Back Home
        </Link>
      </h1>
      <h2>Hello, i'm a dapp blocklet</h2>

      <Button variant="contained">Hello World</Button>
      <BlockInfo />
      <TxTable />
    </div>
  );
}

export default Query;
