import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
function ResultDisplay({ results }) {
  if (!results.length) return null;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Shortened URLs:</Typography>
      {results.map((res, i) => (
        <Card key={i} sx={{ my: 2 }}>
          <CardContent>
            <Typography>
              Short URL: <a href={`/${res.shortcode}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3000/${res.shortcode}`}</a>
            </Typography>
            <Typography>Expires At: {new Date(res.expiry).toLocaleString()}</Typography>
            <Button component={Link} to={`/stats/${res.shortcode}`} variant="outlined" sx={{ mt: 1 }}>
              View Stats
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
export default ResultDisplay;