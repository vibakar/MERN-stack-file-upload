import React from "react";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ApiService from '../services/api.service';

function FilesTable(props) {
  const handleDownload = (fileName) => {
    ApiService.downloadFile(fileName);
  }
  
  return (
    <div className="files-table">
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell align="left">S.No</TableCell>
                        <TableCell align="left">File Name</TableCell>
                        <TableCell align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.files && props.files.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{index + 1}</TableCell>
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
