/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from '../libs/api.js';
import styles from './styles.module.scss';
import { updateHash } from '../store/hash';

// const Item = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'left',
//   // color: theme.palette.text.secondary,
// }));

function HashItem(props) {
  const dispatch = useDispatch();
  const handleClickHash = () => {
    dispatch(updateHash(props.value));
  };
  return (
    <Typography
      variant="body1"
      gutterBottom
      noWrap
      onClick={handleClickHash}
      className={styles.hash}
      title={`click to search of hash:${props.value}`}>
      {props.value}
    </Typography>
  );
}

export default function BlockInfo(props) {
  const [blockInfo, setblockInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.hash) {
      setLoading(true);
      axios
        .post(`/api/blockchaininfo/${props.hash}`)
        .then((response) => {
          // console.log(response);
          setblockInfo(response.data);
        })
        .catch(() => {
          setblockInfo({});
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.hash]);

  return (
    <Card sx={{ minHeight: 600 }}>
      <CardHeader title="Blockchain`s Information" titleTypographyProps={{ align: 'left' }} />
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : Object.keys(blockInfo).length > 0 ? (
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={0}>
              {Object.keys(blockInfo).map((blockKey) => {
                return (
                  <Grid xs={12} md={6} key={blockKey}>
                    <div className={styles['field-container']}>
                      <Typography variant="h6" gutterBottom className={styles.time}>
                        {blockKey.toUpperCase()}
                      </Typography>
                      {blockKey === 'prev_block' || blockKey === 'next_block' ? (
                        <HashItem value={blockInfo[blockKey].toString()} />
                      ) : (
                        <Typography variant="body1" gutterBottom noWrap>
                          {blockInfo[blockKey].toString()}
                        </Typography>
                      )}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          <div className={styles['no-data']}>There is no data</div>
        )}
      </CardContent>
    </Card>
  );
}
