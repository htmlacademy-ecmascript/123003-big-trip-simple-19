import dayjs from 'dayjs';

const DateFormat = {
  DATE: 'D MMM',
  TIME: 'HH:mm',
};

const currentDate = dayjs();

function formatDateShort(date) {
  return date ? dayjs(date).format(DateFormat.DATE) : '';
}

function formatTime(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

function isFuturePoint(point) {
  return dayjs(point.date_from) >= currentDate;
}

function sortByTime(points) {
  return points.sort(( a, b ) => (dayjs(b.date_from).isAfter(dayjs(a.date_from)) ? 1 : -1));
}

function sortByPrice(points) {
  return points.sort(( a, b ) => (b.basePrice > a.basePrice) ? 1 : -1);
}

export { formatDateShort, formatTime, isFuturePoint, sortByTime, sortByPrice };
