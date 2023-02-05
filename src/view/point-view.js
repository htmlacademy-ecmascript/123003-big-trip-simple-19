import AbstractView from '../framework/view/abstract-view.js';
import { formatDateShort, formatTime } from '../utils/points.js';

const NO_SELECTED_OFFERS_TEXT = 'No additional offers';

function createofferOptionsTemplate ({ title, price }) {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${ title }</span>
      +€&nbsp;
      <span class="event__offer-price">${ price }</span>
    </li>`
  );
}

function createTemplate({ point, destinations = [], offers = [] }) {
  const {
    type: pointType,
    basePrice,
    dateFrom,
    dateTo,
    destination: pointDestinationId,
  } = point;

  const { name = '' } = destinations.find(({ id }) => id === pointDestinationId);
  const pointDate = formatDateShort(dateFrom);
  const timeFrom = formatTime(dateFrom);
  const timeTo = formatTime(dateTo);
  const { offers: offerOptions } = offers.find(({ type }) => type === pointType);
  const offerOptionsTemplate = offerOptions.length === 0
    ? NO_SELECTED_OFFERS_TEXT
    : offerOptions.map(createofferOptionsTemplate).join('');
  const rollupButtonTemplate =
   `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${ dateFrom }">${ pointDate }</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${ pointType }.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${ pointType } ${ name } </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${ dateFrom.toISOString() }">${ timeFrom }</time>
            —
            <time class="event__end-time" datetime="${ dateTo.toISOString() }">${ timeTo }</time>
          </p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${ basePrice }</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${ offerOptionsTemplate }
        </ul>
         ${ rollupButtonTemplate }
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #offers = [];
  #destinations = [];
  #handleRollupButtonClick = null;

  constructor({ point, destinations, offers, onRollupButtonClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#rollupButtonClickHandler);
  }

  get template() {
    return createTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  #rollupButtonClickHandler = () => {
    this.#handleRollupButtonClick();
  };
}
