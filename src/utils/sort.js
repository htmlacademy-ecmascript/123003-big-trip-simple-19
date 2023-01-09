import { SortType } from '../const.js';
import { sortByTime, sortByPrice } from './points.js';

const sort = {
  [SortType.DAY]: (points) => sortByTime(points),
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points,
  [SortType.PRICE]: (points) => sortByPrice(points),
  [SortType.OFFER]: (points) => points,
};

export { sort };
