import { SortType } from '../const.js';
import { sortByTime, sortByPrice } from './points.js';

const sortPointsToType = {
  [SortType.DAY]: sortByTime,
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points,
  [SortType.PRICE]: sortByPrice,
  [SortType.OFFER]: (points) => points,
};


function generateSortItems(points) {
  return Object.entries(sortPointsToType).map(
    ([sortName, sortPoints]) => ({
      name: sortName,
      count: sortPoints(points).length,
    }),
  );
}

export { generateSortItems };
