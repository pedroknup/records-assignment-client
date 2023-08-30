import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './FileSelect.css';

interface FileSelectProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
}

const FileSelect: React.FC<FileSelectProps> = ({ onFilesChange, files }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files];
    console.log(
      'file names',
      newFiles.map((file) => file.name)
    );
    const supportedFileFormats = ['csv', 'xml'];
    const unsupportedFiles = newFiles.filter(
      (file) =>
        !supportedFileFormats.includes(
          file.name.substring(file.name.lastIndexOf('.') + 1)
        )
    );
    if (unsupportedFiles.length > 0) {
      alert(
        `The following files are not supported: ${unsupportedFiles
          .map((file) => file.name)
          .join(', ')}`
      );
      setIsDragging(false);
      return;
    }
    onFilesChange(newFiles);
    setIsDragging(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // useEffect(() => {
  //   console.log('isDragging', isDragging);
  // }, [isDragging]);

  if (files && files.length > 0)
    return (
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
    );

  return (
    <div className="file-select">
      <div
        className="file-drop-area"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></div>
      <div onClick={handleDragDropClick} className="drag-drop-container">
        <img className="cloud-icon" src="/cloud-icon.png" alt="cloud icon" />
        <div className="drag-drop-text">
          <span>
            Drag and drop or <span className="fake-link">browse</span> your
            files
          </span>
        </div>
      </div>
      <input
        accept=".csv, .xml"
        id="contained-button-file"
        multiple
        type="file"
        className="file-input"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <div className={`drop-area ${isDragging ? 'dragging' : ''}`}>
        <div className="drop-area-text">
          <h1>Drag and drop files here</h1>
        </div>
      </div>
    </div>
  );
};

export default FileSelect;
