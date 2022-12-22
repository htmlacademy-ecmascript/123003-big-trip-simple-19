import dayjs from 'dayjs';

const DateFormat = {
  DATE: 'D MMM',
  TIME: 'HH:mm',
};

function getRandomArrayItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDateShort(date) {
  return date ? dayjs(date).format(DateFormat.DATE) : '';
}

function formatTime(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

function capitalize(text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

export { getRandomArrayItem, formatDateShort, formatTime, capitalize };
