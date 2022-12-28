import { getDestinations } from '../mock/mock.js';

export default class DestionatiosModel {
  #destinations = getDestinations();

  get destinations() {
    return this.#destinations;
  }
}
