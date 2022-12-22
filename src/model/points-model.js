import { getRandomPoint } from '../mock/mock.js';

export default class PointsModel {
  points = Array.from({ length: 3 }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
