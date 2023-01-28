import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: filterPointsByFuture,
};

function filterPointsByFuture(points, dateNow = Date.now()) {
  return points.filter(({ dateFrom }) => dateFrom.getTime() > dateNow);
}

function filterPoints(points, filterType = FilterType.EVERYTHING) {
  return filterTypeToFilter[filterType]?.(points) ?? points.slice();
}

function hasFuturePoints(points, dateNow = Date.now()) {
  return points.some(({ dateFrom }) => dateFrom.getTime() > dateNow);
}

export { hasFuturePoints, filterPoints };
