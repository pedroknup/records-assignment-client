import React, { useState } from 'react';
import './App.css';
import RecordsTable from './components/records-table/RecordsTable';
import { processRecords } from './services/records.service';
import { RecordModel } from './data/models/record.model';
import { Button } from '@mui/material';

function App() {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [file, setFile] = useState<undefined | any>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const handleFileUploadClick = async () => {
    const records = await processRecords(file);
    setRecords(records);
  };

  const handleSelectFileClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="container">
        <div className="file-input-container">
      <div>
          <input
            accept=".csv"
            id="contained-button-file"
            multiple
            type="file"
            className="file-input"
            onChange={handleFileChange}
            ref={inputRef}
          />
        </div>
        <label htmlFor="contained-button-file" className="file-label">
          <Button
            onClick={handleSelectFileClick}
            className="select-file-button"
          >
            Select File
          </Button>
          {file && file.name}
        </label>
        {file ? (
          <div>
            <Button
              variant="contained"
              onClick={handleFileUploadClick}
              type="button"
            >
              Upload File
            </Button>
          </div>
        ) : (
          <p>No file selected</p>
        )}
      </div>
      <RecordsTable records={records} />
    </div>
  );
}

export default App;
