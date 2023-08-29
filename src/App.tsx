import { useState } from 'react';
import RecordsTable from './components/records-table/RecordsTable';
import { processRecords } from './services/records.service';
import { RecordModel } from './data/models/record.model';
import { Button } from '@mui/material';
import './App.css';
import FileSelect from './components/file-select/FileSelect';

function App() {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [file, setFile] = useState<undefined | any>();

  const handleFileUploadClick = async () => {
    const records = await processRecords(file);
    setRecords(records);
  };

  return (
    <div className="container">
      <div className="form">
        <FileSelect onFileChange={setFile} file={file}/>
        <div>
          <Button
            variant="contained"
            onClick={handleFileUploadClick}
            type="button"
            disabled={!file}
          >
            Upload File
          </Button>
        </div>
      </div>
      <RecordsTable records={records} />
    </div>
  );
}

export default App;
