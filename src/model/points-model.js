import { getRandomPoint } from '../mock/mock.js';
import { COUNT } from '../const.js';


export default class PointsModel {
  points = Array.from({length: COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
