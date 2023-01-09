import { filter } from '../utils/filter.js';

function generateFilterItems(points) {
  return Object.entries(filter).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length,
    }),
  );
}

export { generateFilterItems };
