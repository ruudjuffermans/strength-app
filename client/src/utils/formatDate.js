export function formatDate(isoString) {
    if (isoString == null) return 
    const date = new Date(isoString);
  
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Amsterdam',
      hour12: true,
    };
  
    return date.toLocaleString('nl-NL', options);
  }