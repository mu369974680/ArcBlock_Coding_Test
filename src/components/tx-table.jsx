/* eslint-disable react/prop-types */
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from '../libs/api.js';

const getShortHash = (hash) => {
  return `${hash.substring(0, 4)}-${hash.substring(hash.length - 4, hash.length)}`;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Typography variant="body" gutterBottom component="div">
            ID:{getShortHash(row.hash)}
          </Typography>
          <Typography variant="body" gutterBottom component="div">
            {new Date(row.time * 1000).toISOString()}
          </Typography>
        </TableCell>
        <TableCell>
          From {row.inputs.length} inputs to {row.out.length} outputs
        </TableCell>
        <TableCell>
          <Typography variant="body" gutterBottom component="div">
            {row.size} BTC
          </Typography>
          <Typography variant="body" gutterBottom component="div">
            Fee:{row.fee}
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.out.map((outRow) => (
                    <TableRow key={outRow.script}>
                      <TableCell>{outRow.addr}</TableCell>
                      <TableCell align="right">{outRow.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TxTable(props) {
  const [pageData, setpageData] = useState({
    rows: [],
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });
  const [pageProp, setpageProp] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  const handleChangePage = (event, newPage) => {
    setpageProp({
      ...pageProp,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setpageProp({
      // ...pageProp,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  useEffect(() => {
    if (props.hash) {
      axios
        .post('/api/blockchaintx', {
          ...pageProp,
          hash: props.hash,
        })
        .then((response) => {
          // console.log(response);
          setpageData(response.data);
        })
        .catch(() => {
          // console.log(error);
        });
    }
  }, [pageProp, props.hash]);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Transaction</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Operation </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pageData.rows.map((row) => (
          <Row key={row.hash} row={row} />
          // <TableRow key={row.hash}>
          //   <TableCell>{row.hash}</TableCell>
          //   <TableCell>{row.inputs.length}</TableCell>
          //   <TableCell>{row.fee}</TableCell>
          // </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={4}
            count={pageData.total}
            rowsPerPage={pageData.rowsPerPage}
            page={pageData.page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
