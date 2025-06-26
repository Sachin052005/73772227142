export function useLogger() {
  const log = (message, context = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      context
    };
    let logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('logs', JSON.stringify(logs));
  };
  return { log };
}
