import { useState } from 'react';
import RecordsTable from './components/records-table/RecordsTable';
import { processRecords } from './services/records.service';
import { RecordModel } from './data/models/record.model';
import { Button } from '@mui/material';
import './App.css';
import FileSelect from './components/file-select/FileSelect';

function App() {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUploadClick = async () => {
    if (!files) return;

    const records = await processRecords(files);
    setRecords(records);
  };
 
  return (
    <div className="container">
      <div className="form">
        <FileSelect onFilesChange={setFiles} files={files} />
        <div>
          <Button
            variant="contained"
            onClick={handleFileUploadClick}
            type="button"
            disabled={files.length === 0}
            className="process-files-button"
          >
            Process Files
          </Button>
        </div>
      </div>
      <RecordsTable records={records} />
    </div>
  );
}

export default App;
