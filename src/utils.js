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

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export { getRandomArrayItem, formatDateShort, formatTime, capitalize };
