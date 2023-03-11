// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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

  const handleClickSearchBtn = () => {};

  return (
    <div>
      {/* <h1>
        <Link className="app-link" to="/">
          Back Home
        </Link>
      </h1>
      <h2>Hello, i'm a dapp blocklet</h2>

      <Button variant="contained">Hello World</Button> */}

      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Input the blockchain`s hash</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickSearchBtn} edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Input the blockchain`s hash"
            />
          </FormControl>
        </Grid>
        <Grid xs={12} md={5}>
          <BlockInfo />
        </Grid>
        <Grid xs={12} md={7}>
          <TxTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Query;
