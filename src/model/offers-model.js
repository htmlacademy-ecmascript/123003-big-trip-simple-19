import { getOffers } from '../mock/mock.js';

export default class OffersModel {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }
}
