import React, { useState, useEffect } from 'react';
import Header from './Header';
import FileUpload from './FileUpload';
import FilesTable from './FilesTable';
import ApiService from '../services/api.service';

function Dashboard() {
    const [files, setFiles] = useState(null);
    const [backupFiles, setBackupFiles] = useState([]);

    const getFiles = () => {
        ApiService.getFiles()
        .then(resp => {
            if(resp.success) {
                setFiles(resp.files);
                setBackupFiles(resp.files);
            }
            else {
                setFiles([]);
            }
        })
        .catch(err => setFiles([]));
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
            <FileUpload updateTable={getFiles}></FileUpload>
            <FilesTable files={files} filterTable={filterTable}></FilesTable>
        </>
    )
}

export default Dashboard;