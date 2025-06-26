import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLogger } from '../middleware/logger';

function RedirectHandler() {
  const { shortcode } = useParams();
  const { log } = useLogger();
  useEffect(() => {
    const links = JSON.parse(localStorage.getItem('shortlinks') || '{}');
    const clicks = JSON.parse(localStorage.getItem('clicks') || '{}');
    const data = links[shortcode];
    if (data && data.expiresAt > Date.now()) {
      clicks[shortcode].push({
        timestamp: new Date().toISOString(),
        source: document.referrer || 'direct',
        location: 'India' // mock
      });
      localStorage.setItem('clicks', JSON.stringify(clicks));
      log('Redirecting to long URL', { shortcode });
      window.location.href = data.original;
    } else {
      alert('This link has expired or does not exist.');
    }
  }, [shortcode, log]);
  return <p>Redirecting...</p>;
}
export default RedirectHandler;
