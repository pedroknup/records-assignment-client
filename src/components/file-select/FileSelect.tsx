import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from '@mui/material';
import './FileSelect.css';
import { getRelativePath } from '../../utils/get-relative-path.util';

const UNSUPPORTED_FILE_FORMAT_MESSAGE: string =
  'One or more selected files are not supported. Please select only .csv or .xml files.';

interface FileSelectProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
}

const FileSelect: React.FC<FileSelectProps> = ({ onFilesChange, files }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragover', handleDragOver);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  const handleDragDropClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: improve this
    const files: File[] = [];
    for (let i = 0; i < e.target.files!.length; i++) {
      files.push(e.target.files![i]);
    }

    onFilesChange(files);
  };

  const removeFile = (file: File) => {
    onFilesChange(files?.filter((f) => f !== file) ?? null);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    if (!event?.dataTransfer?.files) {
      return;
    }

    const newFiles = [...event.dataTransfer.files];
    const supportedFileFormats = ['csv', 'xml'];
    const unsupportedFiles = newFiles.filter(
      (file) =>
        !supportedFileFormats.includes(
          file.name.substring(file.name.lastIndexOf('.') + 1)
        )
    );
    if (unsupportedFiles.length > 0) {
      setIsSnackbarOpen(true);
      setIsDragging(false);
      setTimeout(() => {
        setIsSnackbarOpen(false);
      }, 3000);
      return;
    }

    const fileSet = new Set([...files, ...newFiles]);
    onFilesChange(Array.from(fileSet));
    setIsDragging(false);
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const closeSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <div className="file-select">
      {files?.length > 0 && (
        <div className="files-container">
          {files.map((file) => (
            <div className="file-container">
              <div className="file-name">{file.name}</div>
              <CloseIcon
                className="close-icon"
                onClick={() => removeFile(file)}
              />
            </div>
          ))}
        </div>
      )}

      {files?.length === 0 && (
        <div onClick={handleDragDropClick} className="drag-drop-container">
          <img className="cloud-icon" src={getRelativePath("cloud-icon.png")} alt="cloud icon" />
          <div className="drag-drop-text">
            <span>
              Drag and drop or <span className="fake-link">browse</span> your
              files
            </span>
          </div>
        </div>
      )}
      <input
        accept=".csv, .xml"
        id="contained-button-file"
        multiple
        type="file"
        className="file-input"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert severity="error" onClose={closeSnackbar}>
          {UNSUPPORTED_FILE_FORMAT_MESSAGE}
        </Alert>
      </Snackbar>
      <div className={`drop-area ${isDragging ? 'dragging' : ''}`}>
        <h1 className="drop-area-text">
          Drag and drop files here
        </h1>
        {isDragging && (
          <div
            className="file-drop-area"
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FileSelect;
