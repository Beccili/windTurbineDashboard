import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const getSeverity = (severity) => {
  if (severity === 3) {
    return "Extreme severity";
  } else if (severity === 2) {
    return "Severity";
  } else {
    return "Less severity";
  }
}

function FaultTable({ events }) {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>Recent Fault Events</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No fault events recorded
                </TableCell>
              </TableRow>
            ) : (
              events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.timestamp}</TableCell>
                  <TableCell>{getSeverity(event.severity)}</TableCell>
                  <TableCell>({event.score})</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FaultTable; 