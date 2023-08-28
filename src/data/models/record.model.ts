export interface RecordModel {
  id: number;
  accountNumber: string;
  description: string;
  startBalance: number;
  mutation: number;
  endBalance: number;
  isValid: boolean;
  validationNotes?: string;
}
