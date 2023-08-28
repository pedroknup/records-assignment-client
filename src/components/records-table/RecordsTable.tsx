import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { RecordModel } from '../../data/models/record.model';
import './RecordsTable.css';

interface RecordsTableProps {
  records: RecordModel[];
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => {
  return (
    <TableContainer className="table-container" component={Paper}>
      <Table aria-label="records table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Start Balance</TableCell>
            <TableCell>Mutation</TableCell>
            <TableCell>End Balance</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={record.validationNotes && 'failed-record'}
              key={record.id}
            >
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.accountNumber}</TableCell>
              <TableCell>{record.description}</TableCell>
              <TableCell>{record.startBalance}</TableCell>
              <TableCell>{record.mutation}</TableCell>
              <TableCell>{record.endBalance}</TableCell>
              <TableCell>{record.validationNotes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordsTable;
