import { FilterType } from '../const.js';

const filterTypeToFilter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: filterPointsByFuture,
};

function checkPointByFuture({ dateFrom, dateTo }, dateNow = Date.now()) {
  return dateFrom.getTime() >= dateNow ||
    (dateFrom.getTime() < dateNow && dateTo.getTime() > dateNow);
}

function filterPointsByFuture(points) {
  return points.filter((point) => checkPointByFuture(point));
}

function filterPoints(points, filterType) {
  return filterTypeToFilter[filterType]?.(points) ?? points.slice();
}

function hasFuturePoints(points) {
  return points.some((point) => checkPointByFuture(point));
}

export { hasFuturePoints, filterPoints };
