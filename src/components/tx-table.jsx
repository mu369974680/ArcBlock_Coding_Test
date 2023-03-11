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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>{row.hash}</TableCell>
        <TableCell>{row.inputs.length}</TableCell>
        <TableCell>{row.fee}</TableCell>
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

export default function TxTable() {
  const [pageData, setpageData] = useState({
    rows: [],
    page: 0,
    rowsPerPage: 10,
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
    axios
      .post('/api/blockchaintx', {
        ...pageProp,
      })
      .then((response) => {
        // console.log(response);
        setpageData(response.data);
      })
      .catch(() => {
        // console.log(error);
      });
  }, [pageProp]);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
          <TableCell />
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
            colSpan={3}
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
