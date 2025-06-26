import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function StatisticsPage() {
  const { shortcode } = useParams();
  const clicks = JSON.parse(localStorage.getItem('clicks') || '{}')[shortcode] || [];
  return (
    <>
      <Typography variant="h5" gutterBottom>Click Statistics for: {shortcode}</Typography>
      <Typography>Total Clicks: {clicks.length}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clicks.map((click, i) => (
            <TableRow key={i}>
              <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
              <TableCell>{click.source}</TableCell>
              <TableCell>{click.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default StatisticsPage;