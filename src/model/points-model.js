import { getPoints } from '../mock/mock.js';

export default class PointsModel {
  #points = getPoints().slice(0, 15);

  get points() {
    return this.#points;
  }
}
