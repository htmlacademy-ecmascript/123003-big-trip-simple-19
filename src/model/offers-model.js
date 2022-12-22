import { getOffers } from '../mock/mock.js';

export default class OffersModel {
  offers = getOffers();

  getOffers() {
    return this.offers;
  }
}
