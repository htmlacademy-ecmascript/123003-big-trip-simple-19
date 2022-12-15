import dayjs from 'dayjs';

const DateFormat = {
  TEXTED_DATE: 'D/MM/YY HH:mm',
  NUMERIC_DATE: 'D MMM',
  TIME: 'HH:mm',
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

function turnDateToNumbers(date) {
  return date ? dayjs(date).format(DateFormat.TEXTED_DATE) : '';
}

function turnDateToText(date) {
  return date ? dayjs(date).format(DateFormat.NUMERIC_DATE) : '';
}

function turnTimeToNumbers(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

const isUndefined = (element, defaultMessage) => element === undefined ? defaultMessage : element;


export { getRandomArrayElement, turnDateToNumbers, turnDateToText, turnTimeToNumbers, isUndefined };
