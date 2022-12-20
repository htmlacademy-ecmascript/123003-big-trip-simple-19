import dayjs from 'dayjs';

const DateFormat = {
  TEXTED_DATE: 'D/MM/YY HH:mm',
  NUMERIC_DATE: 'D MMM',
  TIME: 'HH:mm',
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

function formatDateLong(date) {
  return date ? dayjs(date).format(DateFormat.TEXTED_DATE) : '';
}

function formatDateShort(date) {
  return date ? dayjs(date).format(DateFormat.NUMERIC_DATE) : '';
}

function formatTime(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

export { getRandomArrayElement, formatDateShort, formatDateLong, formatTime };
