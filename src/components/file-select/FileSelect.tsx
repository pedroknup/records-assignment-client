import React from 'react';
import './FileSelect.css';
import CloseIcon from '@mui/icons-material/Close';

interface FileSelectProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
}

const FileSelect: React.FC<FileSelectProps> = ({ onFilesChange, files }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    </div>
  );
};

export default FileSelect;
