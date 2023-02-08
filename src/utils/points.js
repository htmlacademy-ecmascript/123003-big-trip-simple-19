import dayjs from 'dayjs';
import { DateFormat } from '../const.js';

function formatDateShort(date) {
  return date ? dayjs(date).format(DateFormat.SHORT) : '';
}

function formatTime(date) {
  return date ? dayjs(date).format(DateFormat.TIME) : '';
}

function sortByDay(points) {
  return points.sort((a, b)=>dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
}

function sortByPrice(points) {
  return points.sort(( a, b ) => (b.basePrice > a.basePrice) ? 1 : -1);
}

function sortByTime(points) {
  return points.sort(( a, b ) => dayjs(b.dateTo).diff(b.dateFrom) - dayjs(a.dateTo).diff(a.dateFrom));
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function isDatesEqual(a, b) {
  return (a === null && b === null) || dayjs(a).isSame(dayjs(b));
}

export { formatDateShort, formatTime, sortByDay, sortByPrice, sortByTime, updateItem, isDatesEqual };
