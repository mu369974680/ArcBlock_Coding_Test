// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TxTable from '../components/tx-table';
import BlockInfo from '../components/block-info';

// import axios from '../libs/api.js';

function Query() {
  const [hash, setHash] = useState('');
  const [hashInput, setHashInput] = useState('');

  const handleClickSearchBtn = () => {
    setHash(hashInput);
  };

  const handleInputHash = (e) => {
    setHashInput(e.target.value);
  };

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
          <FormControl sx={{ m: 1, width: '70ch' }} variant="outlined">
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
              value={hashInput}
              label="Input the blockchain`s hash"
              onChange={handleInputHash}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} md={5}>
          <BlockInfo hash={hash} />
        </Grid>
        <Grid xs={12} md={7}>
          <TxTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Query;
