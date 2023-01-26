import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points, dateNow = Date.now()) => points.filter(({ dateFrom }) => dateFrom.getTime() > dateNow),
};

function filterPointsByFuture(points, dateNow = Date.now()) {
  return points.filter(({ dateFrom }) => dateFrom.getTime() > dateNow);
}

function hasFuturePoints(points, dateNow = Date.now()) {
  return points.some(({ dateFrom }) => dateFrom.getTime() > dateNow);
}

export { filterTypeToFilter, filterPointsByFuture, hasFuturePoints };
