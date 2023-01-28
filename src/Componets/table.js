// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import '../Assets/Styles/table.css'

// const columns = [
//   { id: 'users', label: 'Users', minWidth: 170 },
//   { id: 'role', label: 'Role', minWidth: 100 },
//   {
//     id: 'contribution',
//     label: 'Contribution',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'id',
//     label: 'ID',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'email',
//     label: 'Email',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
// ];

// function createData(users, role, contribution, id, email) {
  
//   return { users, role, contribution, id, email };
// }

// const rows = [
//   createData('Nahom', 'Admin', 13, 328, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 14, 959, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 60, 301, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 32, 983, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 37, 998, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 25, 769, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 83, 357, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 48, 702, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 12, 197, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 12, 377, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 67, 640, 'nahom@mail.com'),
//   createData('Nahom ', 'Admin', 67, 242, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 14, 170, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 20, 923, 'nahom@mail.com'),
//   createData('Nahom', 'Admin', 21, 851, 'nahom@mail.com'),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper id='paper' sx={{ width: '81%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
