import { RecordModel } from "../data/models/record.model";

interface RecordsResponse {
  records: RecordModel[];
  success: boolean;
}

export const processRecords = async (
  csvFiles: File[]
): Promise<RecordModel[]> => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) throw new Error('API_URL not found');

  const formData = new FormData();
  csvFiles.forEach((csvFile, index) => {
    formData.append(`file`, csvFile);
  });

  const options = {
    method: 'POST',
    body: formData,
  };

  const endpoint = `records/process-records`;
  const baseURL = API_URL;
  const url = `${baseURL}/${endpoint}`;

  const response = await fetch(url, options);

  const responseData: RecordsResponse = await response.json();
  return responseData.records;
};