const TimeFormatter = (time) => {
  const date = new Date(time);
  const dateStr = date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });
  return [dateStr, timeStr];
};

export default TimeFormatter;
