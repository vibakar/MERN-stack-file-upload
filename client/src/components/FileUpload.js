import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function FileUpload() {
    const [file, setFile] = useState(null);
   
    const maxFiles = 1;
    const multiple = false;

    const handleDrop = (file) => {
        setFile(file[0]);
    }

    const handleUpload = (file) => {
        console.log(file);
        setFile(null);
    };

    return (
        <Dropzone onDrop={handleDrop} maxFiles={maxFiles} multiple={multiple} accept=".pdf">
        {({getRootProps, getInputProps}) => (
          <section className="file-upload-container">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <span className="pointer">Drag and drop the files here or click to select files</span>
            </div>
            <p>
                <Button
                    color="primary"
                    onClick={handleUpload}
                    startIcon={<CloudUploadIcon />}
                    disabled={!file}
                >
                Upload
                </Button>
            </p>
            {file ? file.name : ''}
          </section>
        )}
      </Dropzone>
    )
}

export default FileUpload;