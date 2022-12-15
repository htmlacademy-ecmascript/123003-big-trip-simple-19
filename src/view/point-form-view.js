import { createElement } from '../render.js';
import { getRandomArrayElement, turnDateToNumbers, turnTimeToNumbers } from '../utils.js';

function createRollupButtonTemplate() {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
}

function createCancelButtonTemplate() {
  return 'Cancel';
}
function createDeleteButtonTemplate() {
  return 'Delete';
}
function createTypeListItem(point = {}) {
  const { type } = point;
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
  );
}
function createDestinationPicture(destination = {}) {
  const photo = getRandomArrayElement(destination.pictures).src;
  return(
    `<img class="event__photo" src="${photo}" alt="Event photo">`
  ) ;
}

function createOfferItem(offer = {}) {
  const { type } = offer;
  const offerPrice = getRandomArrayElement(offer.offers).price;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
      <label class="event__offer-label" for="event-offer-train-1">
      <span class="event__offer-title">Travel by ${type}</span>
      +€&nbsp;
      <span class="event__offer-price">${offerPrice}</span>
      </label>
    </div>`
  ) ;
}

function createTemplate(point, destination) {
  const {
    id = '1',
    type,
    dateFrom,
    dateTo
  } = point;
  const { name } = destination;
  const pointDateFrom = turnDateToNumbers(dateFrom);
  const pointDateTo = turnDateToNumbers(dateTo);
  const timeFrom = turnTimeToNumbers(dateFrom);
  const timeTo = turnTimeToNumbers(dateTo);
  const isNew = id === undefined;

  const rollupButtonTemplate = isNew
    ? ''
    : createRollupButtonTemplate();

  const cancelButtonTemplate = isNew
    ? createCancelButtonTemplate()
    : createDeleteButtonTemplate();

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
                  ${createTypeListItem()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${pointDateFrom} ${timeFrom}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${pointDateTo} ${timeTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">
            ${cancelButtonTemplate}
          </button>                  
          ${rollupButtonTemplate}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createOfferItem()}
            ${createOfferItem()}
            ${createOfferItem()}
            ${createOfferItem()}
            ${createOfferItem()}
          </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createDestinationPicture()}
                ${createDestinationPicture()}
                ${createDestinationPicture()}
                ${createDestinationPicture()}
                ${createDestinationPicture()}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class PointFormView {
  constructor(point, destination, offer) {
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
