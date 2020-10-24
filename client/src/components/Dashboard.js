import React, { useState, useEffect } from 'react';
import Header from './Header';
import FileUpload from './FileUpload';
import FilesTable from './FilesTable';
import ApiService from '../services/api.service';

function Dashboard() {
    const [files, setFiles] = useState(null);
    useEffect(() => {
        if(!files) {
            ApiService.getFiles()
            .then(resp => {
                if(resp.success)
                    setFiles(resp.files);
                else
                    setFiles([]);
            })
            .catch(err => setFiles([]));
        }
    }, [files])

    return (
        <>
            <Header></Header>
            <FileUpload></FileUpload>
            <FilesTable files={files}></FilesTable>
        </>
    )
}

export default Dashboard;