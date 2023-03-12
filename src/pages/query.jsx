// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import FilledInput from '@mui/material/FilledInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TxTable from '../components/tx-table';
import BlockInfo from '../components/block-info';
import { updateHash } from '../store/hash';

// import axios from '../libs/api.js';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Query() {
  const hash = useSelector((state) => state.hash.value);
  const dispatch = useDispatch();

  // const [hash, setHash] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickSearchBtn = () => {
    if (hashInput.length === 64) {
      dispatch(updateHash(hashInput));
    } else {
      setOpen(true);
    }
  };

  const handleInputHash = (e) => {
    setHashInput(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setHashInput(hash);
  }, [hash]);

  return (
    <>
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Card>
                <CardContent>
                  <FormControl sx={{ m: 1, width: '70%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Input the blockchain`s hash</InputLabel>
                    <FilledInput
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
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={5}>
              <BlockInfo hash={hash} />
            </Grid>
            <Grid xs={12} md={7}>
              <TxTable hash={hash} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={open}
        message="Please input legal hash!"
        onClose={handleClose}
      /> */}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">Please input legal hash!</Alert>
      </Snackbar>
    </>
  );
}

export default Query;
