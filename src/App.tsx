import { useState } from 'react';
import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';
import { processRecords } from './services/records.service';
import { RecordModel } from './data/models/record.model';
import FileSelect from './components/file-select';
import RecordsTable from './components/records-table';
import './app.css';

function App() {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUploadClick = async () => {
    if (!files) return;

    setIsLoading(true);
    try {
      const records = await processRecords(files);
      setRecords(records);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      setRecords([]);
    }
    setIsLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <h1>Transactions Validator</h1>
      <div className="form">
        <FileSelect onFilesChange={setFiles} files={files} />
        <div>
          <Button
            variant="contained"
            onClick={handleFileUploadClick}
            type="button"
            disabled={isLoading || files.length === 0}
            className="process-files-button"
          >
            {isLoading && (
              <CircularProgress className="spinning-loader" size={24} />
            )}
            Process Transactions
          </Button>
        </div>
      </div>
      <RecordsTable records={records} />
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={clearError}
      >
        <Alert severity="error" onClose={clearError}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
