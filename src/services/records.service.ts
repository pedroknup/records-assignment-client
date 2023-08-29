import { RecordModel } from "../data/models/record.model";

interface RecordsResponse {
  records: RecordModel[];
  success: boolean;
}

export const processRecords = async (
  csvFiles: File[]
): Promise<RecordModel[]> => {
  const API_URL = process.env.REACT_APP_API_URL;

  const formData = new FormData();
  csvFiles.forEach((csvFile, index) => {
    formData.append(`file${index}`, csvFile);
  });

  const options = {
    method: 'POST',
    body: formData,
  };

  const response = await fetch(`${API_URL}/records/process-records`, options);

  const responseData: RecordsResponse = await response.json();
  return responseData.records;
};