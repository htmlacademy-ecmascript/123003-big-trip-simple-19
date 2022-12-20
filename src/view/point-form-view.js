import { createElement } from '../render.js';

function createRollupButtonTemplate() {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
}

function createTypeListItemTemplate(type) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`
  );
}


// function createofferOptionsTemplate ({ title, price, id }) {
//   return (
//     `<div class="event__offer-selector">
//       <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage">
//       <label class="event__offer-label" for="event-offer-luggage-${id}">
//         <span class="event__offer-title">${title}</span>
//         +€&nbsp;
//         <span class="event__offer-price">${price}</span>
//       </label>
//     </div>`
//   );
// }

function createDestinationPictureTemplate({ src, description }) {
  return (
    `<img class="event__photo" src="${src}" alt="${description}">`
  );
}

function createTemplate({ point, destinations = [], offers = [] }) {
  const CancelButtonText = {
    CANCEL: 'Cancel',
    DELETE: 'Delete',
  };

  const TYPES = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];

  const {
    id: pointId,
    type: pointType,
    destination: pointDestinationId,
    offers: chosenOffers,
  } = point;

  const isNew = pointId === undefined;

  const { name: destinationName, description, pictures } = destinations.find(({ id }) => id === pointDestinationId);

  const { offers: offerOptions } = offers.find(({ type }) => type === pointType);

  const typeListItems = TYPES.map(createTypeListItemTemplate).join('');

  const rollupButtonTemplate = isNew
    ? ''
    : createRollupButtonTemplate();

  const cancelButtonText = isNew
    ? CancelButtonText.CANCEL
    : CancelButtonText.DELETE;

  const destinationNamesTemplate = destinations.map(({ name }) => `<option value="${name}"></option>`).join('');

  const destinationPicturesTemplate = pictures.map(createDestinationPictureTemplate).join('');

  // const offerOptionsTemplate = offerOptions.map(createofferOptionsTemplate).join('');
  const offerOptionsTemplate = offerOptions.map(({ id, title, price }) => {
    const checked = chosenOffers.includes(id) ? 'checked' : '';
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" ${checked}>
        <label class="event__offer-label" for="event-offer-luggage-${id}">
          <span class="event__offer-title">${title}</span>
          +€&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${typeListItems}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${pointType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationNamesTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
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
            ${cancelButtonText}
          </button>                  
          ${rollupButtonTemplate}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offerOptionsTemplate} 
          </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                 ${destinationPicturesTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class PointFormView {
  #point = null;
  #offers = [];
  #destinations = [];

  constructor({ point, destinations, offers }) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  getTemplate() {
    return createTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers
    });
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

