import dayjs from 'dayjs';

const DateFormat = {
  DATE: 'D MMM',
  TIME: 'HH:mm',
};

function formatDateShort(date) {
  return date ? dayjs(date).format(DateFormat.DATE) : '';
}

function formatTime(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

export { formatDateShort, formatTime };
