import { getOffers } from '../mock/mock.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }
}
