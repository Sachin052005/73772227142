import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const redirected = useRef(false);
  useEffect(() => {
    if (redirected.current) return;
    redirected.current = true;
    const record = JSON.parse(localStorage.getItem(`short-${shortcode}`));
    if (!record || new Date() > new Date(record.expiry)) {
      alert('This link has expired.');
      navigate('/');
    } else {
      const clickData = JSON.parse(localStorage.getItem('clicks') || '{}');
      const clicks = clickData[shortcode] || [];
      clicks.push({
        timestamp: new Date(),
        source: document.referrer || 'direct',
        location: 'Localhost'
      });
      clickData[shortcode] = clicks;
      localStorage.setItem('clicks', JSON.stringify(clickData));
      setTimeout(() => {
        window.location.href = record.original;
      }, 300);
    }
  }, [shortcode, navigate]);
  return null;
}
export default RedirectPage;
