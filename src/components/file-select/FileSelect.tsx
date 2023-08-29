import React from 'react';
import './FileSelect.css';
import CloseIcon from '@mui/icons-material/Close';

interface FileSelectProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
}

const FileSelect: React.FC<FileSelectProps> = ({ onFileChange, file }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragDropClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && onFileChange(file);
  };

  if (file)
    return (
      <div className="file-container">
        <div className="file-name">{file.name}</div>
        <CloseIcon
          className="close-icon"
          onClick={() => onFileChange(null)}
        />
      </div>
    );

  return (
    <div className="file-select">
      <div onClick={handleDragDropClick} className="drag-drop-container">
        <img className="cloud-icon" src="/cloud-icon.png" alt="cloud icon" />
        <div className="drag-drop-text">
          <span>
            Drag and drop or <span className="fake-link">browse</span>{' '}
            your files
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
    </div>
  );
};

export default FileSelect;
