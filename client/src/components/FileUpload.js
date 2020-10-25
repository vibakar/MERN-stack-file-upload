import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import ApiService from '../services/api.service';

function FileUpload(props) {
    const [file, setFile] = useState(null);
    const maxFiles = 1;
    const multiple = false;
    
    //Setting max file size to 5MB
    const maxSize = 5242880;

    const handleDrop = (file) => {
        setFile(file[0]);
    }

    const handleUpload = () => {
      props.showBackdrop(true);
      ApiService.uploadFile(file).then(resp => {
        props.showBackdrop(false);
        setFile(null);
        props.updateTable();
      })
      .catch(err => {
        props.showBackdrop(false);
        setFile(null);
      });
    };

    const handleRemove = () => {
      setFile(null);
    };

    return (
      <>
        <Dropzone onDrop={handleDrop} maxFiles={maxFiles} maxSize={maxSize} multiple={multiple} accept=".pdf">
        {({getRootProps, getInputProps}) => (
          <section className="file-upload-container">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <span className="pointer">Drag and drop the files here or click to select files</span>
            </div>
            <p>
                <Button
                    color="primary"
                    className="mb-3"
                    onClick={handleUpload}
                    startIcon={<CloudUploadIcon />}
                    disabled={!file}
                >
                Upload
                </Button>
            </p>
            {file ? <p>
                      <span>{file.name}</span>
                        <Button
                          color="secondary"
                          onClick={handleRemove}
                          startIcon={<ClearIcon />}
                        ></Button>
                  </p> 
            : ''}
            {!file ? <p className="msg">Only pdf files are allowed. Max size 5MB</p> : ''}
          </section>
        )}
      </Dropzone>
      </>
    )
}

export default FileUpload;