import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import ShortenForm from '../components/ShortenForm';
import ResultDisplay from '../components/ResultDisplay';
function ShortenPage() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('short-'));
    const storedResults = keys.map(key => JSON.parse(localStorage.getItem(key)));
    setResults(storedResults);
  }, []);
  const handleSubmit = (entries) => {
    const now = new Date();
    const newResults = entries.map((entry) => {
      const shortcode = entry.shortcode || Math.random().toString(36).substr(2, 5);
      const expiry = new Date(now.getTime() + (entry.validity || 30) * 60000);
      const data = { ...entry, shortcode, expiry };
      localStorage.setItem(`short-${shortcode}`, JSON.stringify(data));
      return data;
    });
    setResults(prev => [...prev, ...newResults]);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
        <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
          Smart URL Shortener
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Shorten your URLs with expiry times and track their performance — all in one elegant interface.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <ShortenForm onSubmit={handleSubmit} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <ResultDisplay results={results} />
        </Box>
      </Paper>
    </Container>
  );
}
export default ShortenPage;
