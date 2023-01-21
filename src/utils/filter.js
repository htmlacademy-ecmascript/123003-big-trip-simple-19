import { FilterType } from '../const.js';
import { isFuturePoint } from './points.js';

const filterPointsToDate = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.slice().filter((point) => isFuturePoint(point)),
};

function generateFilterItems(points) {
  return Object.entries(filterPointsToDate).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length,
    }),
  );
}

export { generateFilterItems };
