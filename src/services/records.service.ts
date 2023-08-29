import { RecordModel } from "../data/models/record.model";
import { csvFileToString } from "../utils/csvFileToString.util";

interface RecordsResponse {
  records: RecordModel[];
  success: boolean;
}

export const processRecords = async (csvFile: File): Promise<RecordModel[]> => {
  const API_URL = process.env.REACT_APP_API_URL;

  const formData = new FormData();
  formData.append('file', csvFile);

  const options = {
    method: 'POST',
    body: formData,
  };

  const response = await fetch(`${API_URL}/records/process-records`, options);

  const responseData: RecordsResponse = await response.json();
  return responseData.records;
}
