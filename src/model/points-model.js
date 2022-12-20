import { getRandomPoint, getDestinations, getOffers } from '../mock/mock.js';

const COUNT = 3;

export default class PointsModel {
  points = Array.from({length: COUNT}, getRandomPoint);
  destinations = getDestinations();
  offers = getOffers();

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
