import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from '../libs/api.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BlockInfo() {
  const [blockInfo, setblockInfo] = useState({});

  useEffect(() => {
    axios
      .post('/api/blockchaininfo/00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
      .then((response) => {
        // console.log(response);
        setblockInfo(response.data);
      })
      .catch(() => {
        // console.log(error);
      });
  }, [blockInfo.hash]);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {Object.keys(blockInfo).map((blockKey) => {
          return (
            <Grid xs={12} md={6} key={blockKey}>
              <Item>{`${blockKey}:${blockInfo[blockKey]}`}</Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
