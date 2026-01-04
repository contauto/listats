const TimeFormatter = (time) => {
  const date = new Date(time);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return [dateStr, timeStr];
};

export default TimeFormatter;
