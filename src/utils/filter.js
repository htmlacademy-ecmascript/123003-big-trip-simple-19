import { FilterType } from '../const.js';
import { isFuturePoint } from './points.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
};

export { filter };
