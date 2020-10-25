import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './Header';
import FileUpload from './FileUpload';
import FilesTable from './FilesTable';
import ApiService from '../services/api.service';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 10,
    color: '#fff',
  },
}));

function Dashboard() {
    const [files, setFiles] = useState(null);
    const [backupFiles, setBackupFiles] = useState([]);
    const [backdrop, setbackdrop] = useState(false);

    const getFiles = () => {
        setbackdrop(true)
        ApiService.getFiles()
        .then(resp => {
            setbackdrop(false)
            if(resp.success) {
                setFiles(resp.files);
                setBackupFiles(resp.files);
            }
            else {
                setFiles([]);
            }
        })
        .catch(err => {
            setFiles([]);
            setbackdrop(false);
        });
    }

    const handleBackdrop = (val) => {
        setbackdrop(val)
    }
    
    const filterTable = (e) => {
        let filteredFiles = backupFiles.filter(f => f.fileName.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 );
        setFiles(filteredFiles);
    }

    useEffect(() => {
        if(!files) {
            getFiles();
        }
    }, [files])

    return (
        <>
            <Header></Header>
            <FileUpload updateTable={getFiles} showBackdrop={handleBackdrop}></FileUpload>
            <FilesTable files={files} filterTable={filterTable}></FilesTable>
            <Backdrop className={useStyles.backdrop} open={backdrop} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Dashboard;