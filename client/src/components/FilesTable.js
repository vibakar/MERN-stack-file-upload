import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    <Card className="summary">
        <CardContent>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className="table-head">
                        <TableRow>
                            <TableCell align="center">S.No</TableCell>
                            <TableCell align="center">File Name</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.files && props.files.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.fileName}</TableCell>
                                <TableCell align="center" onClick={() => handleDownload(row.fileName)}>
                                    <span className="action">Download</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </Card>
  );
}

export default FilesTable;
