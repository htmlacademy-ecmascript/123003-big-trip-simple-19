import { createElement } from '../render.js';
import { getRandomArrayElement, turnDateToText, turnTimeToNumbers, isUndefined } from '../utils.js';

function createTemplate(point, destination, offer) {
  const { type, basePrice, dateFrom, dateTo } = point;
  const { name } = destination;
  const title = isUndefined(getRandomArrayElement(offer.offers).title, 'No additional offers');
  const price = isUndefined(getRandomArrayElement(offer.offers).price, '');
  const pointDate = turnDateToText(dateFrom);
  const timeFrom = turnTimeToNumbers(dateFrom);
  const timeTo = turnTimeToNumbers(dateTo);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${pointDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name} </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T14:30">${timeFrom}</time>
            —
            <time class="event__end-time" datetime="2019-03-18T16:05">${timeTo}</time>
          </p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${title}</span>
            +€&nbsp;
            <span class="event__offer-price">${price} </span>
          </li>
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView {
  constructor({point, destination, offer}) {
    this.point = point;
    this.destination = destination;
    this.offer = offer;
  }

  getTemplate() {
    return createTemplate(this.point, this.destination, this.offer);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
