import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

export default function CustomTable({ tableHead, tableBody }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: '32px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((item, index) => {
                return (
                  <TableCell key={index}>{item}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody ? tableBody.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return <TableRow key={index}>
                {Object.keys(item).map((item1, index1) => {
                  if (item1 === 'team1' && parseInt(item['score1']) > parseInt(item['score2']) ||
                    item1 === 'team2' && parseInt(item['score1']) < parseInt(item['score2'])) {
                    return <TableCell sx={{ backgroundColor: 'green' }} key={index1}>{item[item1]}</TableCell>
                  }
                  if (item1 === 'team1' && parseInt(item['score1']) < parseInt(item['score2']) ||
                    item1 === 'team2' && parseInt(item['score1']) > parseInt(item['score2'])) {
                    return <TableCell sx={{ backgroundColor: 'red' }} key={index1}>{item[item1]}</TableCell>
                  }
                  if (parseInt(item['score1']) === parseInt(item['score2']) && (item1 === 'team1' || item1 === 'team2')) {
                    return <TableCell sx={{ backgroundColor: 'yellow' }} key={index1}>{item[item1]}</TableCell>
                  }
                  return <TableCell key={index1}>{item[item1]}</TableCell>
                })}

              </TableRow>
            }) : null}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableBody ? tableBody.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </>
  )
}
