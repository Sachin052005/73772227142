import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import ShortenPage from './pages/ShortenPage';
import RedirectPage from './pages/RedirectPage';
import StatisticsPage from './pages/StatisticsPage';
function App() {
  return (
    <Router>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          URL Shortener
        </Typography>
        <Routes>
          <Route path="/" element={<ShortenPage />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
          <Route path="/stats/:shortcode" element={<StatisticsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;