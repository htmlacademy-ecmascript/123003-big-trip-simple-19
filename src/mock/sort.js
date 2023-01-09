import { sort } from '../utils/sort.js';

function generateSortItems(points) {
  return Object.entries(sort).map(
    ([sortName, sortPoints]) => ({
      name: sortName,
      count: sortPoints(points).length,
    }),
  );
}

export { generateSortItems };
