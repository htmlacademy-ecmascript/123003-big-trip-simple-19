import { getDestinations } from '../mock/mock.js';

export default class DestionatiosModel {
  destinations = getDestinations();

  getDestinations() {
    return this.destinations;
  }
}
