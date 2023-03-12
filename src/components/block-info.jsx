/* eslint-disable react/prop-types */
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useState, useEffect } from 'react';
import axios from '../libs/api.js';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
}));

export default function BlockInfo(props) {
  const [blockInfo, setblockInfo] = useState({});

  useEffect(() => {
    if (props.hash) {
      axios
        .post(`/api/blockchaininfo/${props.hash}`)
        .then((response) => {
          // console.log(response);
          setblockInfo(response.data);
        })
        .catch(() => {
          // console.log(error);
        });
    }
  }, [blockInfo.hash, props.hash]);

  return (
    <Card sx={{ minHeight: 600 }}>
      <CardHeader title="Blockchain`s Information" titleTypographyProps={{ align: 'left' }} />
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Object.keys(blockInfo).map((blockKey) => {
              return (
                <Grid xs={12} md={6} key={blockKey}>
                  <Item>
                    <Typography variant="h6" gutterBottom>
                      {blockKey}
                    </Typography>
                    <Typography variant="body1" gutterBottom noWrap>
                      {blockInfo[blockKey]}
                    </Typography>
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
