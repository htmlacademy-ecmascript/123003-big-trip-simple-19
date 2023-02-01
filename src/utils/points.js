import dayjs from 'dayjs';
import { DateFormat } from '../const.js';

function formatDateShort(date) {
  return date ? dayjs(date).format(DateFormat.DATE) : '';
}

function formatTime(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

function sortByTime(points) {
  return points.sort(( a, b ) => (dayjs(b.dateFrom).isAfter(dayjs(a.dateFrom)) ? 1 : -1));
}

function sortByPrice(points) {
  return points.sort(( a, b ) => (b.basePrice > a.basePrice) ? 1 : -1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { formatDateShort, formatTime, sortByTime, sortByPrice, updateItem };
