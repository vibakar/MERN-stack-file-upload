import React, { useState, useEffect } from 'react';
import Header from './Header';
import FileUpload from './FileUpload';
import FilesTable from './FilesTable';
import ApiService from '../services/api.service';

function Dashboard() {
    const [files, setFiles] = useState(null);

    const getFiles = () => {
        ApiService.getFiles()
        .then(resp => {
            if(resp.success)
                setFiles(resp.files);
            else
                setFiles([]);
        })
        .catch(err => setFiles([]));
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
            <FilesTable files={files}></FilesTable>
        </>
    )
}

export default Dashboard;