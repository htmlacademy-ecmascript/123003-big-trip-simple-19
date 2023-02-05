import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: filterPointsByFuture,
};

function filterPointsByFuture(points, dateNow = Date.now()) {
  return points.filter(({ dateFrom, dateTo }) => dateFrom.getTime() >= dateNow || (dateFrom.getTime() < dateNow && dateTo.getTime() > dateNow));
}

function filterPoints(points, filterType) {
  return filterTypeToFilter[filterType]?.(points) ?? points.slice();
}

function hasFuturePoints(points, dateNow = Date.now()) {
  return points.some(({ dateFrom, dateTo }) => dateFrom.getTime() >= dateNow || (dateFrom.getTime() < dateNow && dateTo.getTime() > dateNow));
}

export { hasFuturePoints, filterPoints };
