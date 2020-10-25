import React from "react";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ApiService from '../services/api.service';

function FilesTable(props) {
  const role = sessionStorage.getItem('role');
  const handleDownload = (fileName) => {
    ApiService.downloadFile(fileName);
  }
  
  return (
    <div className="files-table">
        <TextField placeholder="Search" className="mb-10" onChange={props.filterTable} />
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
            {props.files && props.files.length === 0 && <caption className="text-center">No Data Found</caption>}
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell align="left">S.No</TableCell>
                        {role === "admin" && <TableCell align="left">User</TableCell>}
                        <TableCell align="left">File Name</TableCell>
                        <TableCell align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.files && props.files.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{index + 1}</TableCell>
                            {role === "admin" && <TableCell align="left">{row.email}</TableCell>}
                            <TableCell align="left">{row.fileName}</TableCell>
                            <TableCell align="left" onClick={() => handleDownload(row.fileName)}>
                                <span className="action">Download</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}

export default FilesTable;
