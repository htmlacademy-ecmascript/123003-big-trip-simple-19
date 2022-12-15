import { getRandomPoint, getRandomDestination, getRandomOffer } from '../mock/mock.js';

const COUNT = 3;

export default class PointsModel {
  points = Array.from({length: COUNT}, getRandomPoint);
  destinations = Array.from({length: COUNT}, getRandomDestination);
  offers = Array.from({length: COUNT}, getRandomOffer);

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
