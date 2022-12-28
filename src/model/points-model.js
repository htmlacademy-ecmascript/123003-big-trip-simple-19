import { getRandomPoint } from '../mock/mock.js';

export default class PointsModel {
  #points = Array.from({ length: 3 }, getRandomPoint);

  get points() {
    return this.#points;
  }
}
