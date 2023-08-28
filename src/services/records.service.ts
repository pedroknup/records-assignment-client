import { RecordModel } from "../data/models/record.model";
import { csvFileToString } from "../utils/csvFileToString.util";

interface RecordsResponse {
  records: RecordModel[];
  success: boolean;
}

export const processRecords = async (csvFile: any): Promise<RecordModel[]> => {
  const API_URL = process.env.REACT_APP_API_URL;
  const csvContent = await csvFileToString(csvFile);

  const response = await fetch(`${API_URL}/records/process-records`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: csvContent,
  });

  const responseData: RecordsResponse = await response.json();
  return responseData.records;
}
