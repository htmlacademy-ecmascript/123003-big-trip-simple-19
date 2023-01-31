import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalize } from '../utils/common.js';
import { POINT_TYPES } from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const DEFAULT_POINT_TYPE = POINT_TYPES[0];
const BLANK_POINT = {
  type: DEFAULT_POINT_TYPE,
  dateFrom: null,
  dateTo: null,
  destination: 0,
  basePrice: 0,
  offers: [],
};
const BLANK_DESTINATION = {
  id: 0,
  name: '',
  description: '',
  pictures: [],
};
const BLANK_OFFER = {
  type: '',
  offers: [],
};
const ResetButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
};

function createRollupButtonTemplate() {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
}

function createDestinationPictureTemplate({ src, description }) {
  return (
    `<img class="event__photo" src="${ src }" alt="${ description }">`
  );
}


function createTemplate({ state, destinations, offers }) {
  const {
    id: pointId = '',
    type: pointType,
    destination: pointDestinationId,
    offers: chosenOffers,
    basePrice,
  } = state;

  const isNew = pointId === '';

  const {
    name: destinationName = '',
    description = '',
    pictures = []
  } = destinations.find(({ id }) => id === pointDestinationId) ?? BLANK_DESTINATION;

  const { offers: offerOptions = [] } = offers.find(({ type }) => type === pointType) ?? BLANK_OFFER;

  const rollupButtonTemplate = isNew
    ? ''
    : createRollupButtonTemplate();

  const resetButtonText = isNew
    ? ResetButtonText.CANCEL
    : ResetButtonText.DELETE;

  const destinationNamesTemplate = destinations.map(({ name }) => `<option value="${ name }"></option>`).join('');

  const destinationPicturesTemplate = pictures.map(createDestinationPictureTemplate).join('');

  const typeListItemsTemplate = POINT_TYPES.map((type) => {
    const checked = (type === pointType)
      ? 'checked'
      : '';

    return (
      `<div class="event__type-item">
        <input id="event-type-${ type }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ type }" ${ checked }>
        <label class="event__type-label  event__type-label--${ type }" for="event-type-${ type }-1">${ capitalize(type) }</label>
      </div>`
    );
  }).join('');


  const offerOptionsTemplate = offerOptions.map(({ id, title, price }) => {
    const checked = chosenOffers.includes(id)
      ? 'checked'
      : '';

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ pointType }-${ id }" type="checkbox" name="event-offer-${ pointType }" ${ checked } data-offer-id="${ id }">
        <label class="event__offer-label" for="event-offer-${ pointType }-${ id }">
          <span class="event__offer-title">${ title }</span>
          +€&nbsp;
          <span class="event__offer-price">${ price }</span>
        </label>
      </div>`
    );
  }).join('');

  const offersTemplate = offerOptions.length === 0
    ? ''
    : `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${ offerOptionsTemplate } 
        </div>
      </section>`;

  const destinationTemplate = pointDestinationId > 0
    ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${ description ?? '' }</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${ destinationPicturesTemplate }
          </div>
        </div>
      </section>`
    : '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${ pointType }.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${ typeListItemsTemplate }
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${ pointType }
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ destinationName }" list="destination-list-1" required> 
            <datalist id="destination-list-1">
              ${ destinationNamesTemplate }
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
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ basePrice }">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">
            ${ resetButtonText }
          </button>                  
          ${ rollupButtonTemplate }
        </header>
        <section class="event__details">
          ${ offersTemplate }
          ${ destinationTemplate }
        </section>
      </form>
    </li>`
  );
}

export default class PointFormView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #datePickerFrom = null;
  #datePickerTo = null;


  constructor({ point = BLANK_POINT, destinations, offers, onFormSubmit, onRollupButtonClick }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this._setState(PointFormView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers,
    });
  }

  reset(point) {
    this.updateElement(
      PointFormView.parsePointToState(point)
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  _restoreHandlers = () => {
    const element = this.element;

    element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#rollupButtonClickHandler);
    element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    element.querySelector('#event-start-time-1').addEventListener('change', this.#dateFromChangeHandler);
    element.querySelector('#event-end-time-1').addEventListener('change', this.#dateToChangeHandler);

    this.#setDatePickerFrom();
    this.#setDatePickerTo();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointFormView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };


  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');

    let selectedOffers = this._state.offers;
    const offerId = evt.target.dataset.offerId;

    if (evt.target.hasAttribute('checked')) {
      selectedOffers.push(+offerId);
    } else {
      selectedOffers = selectedOffers.filter((id) => id !== +(offerId));
    }

    this._setState({
      offers: selectedOffers
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const selectedDestination = this.#destinations.find(({ name }) => destinationName === name) ?? BLANK_DESTINATION;

    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatePickerFrom() {
    this.#datePickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        enableTime: true,
        onChange: this.#dateFromChangeHandler,
        'time_24hr': true,
      },
    );
  }

  #setDatePickerTo() {
    this.#datePickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        enableTime: true,
        onChange: this.#dateToChangeHandler,
        'time_24hr': true,
      },
    );
  }

  static parsePointToState(point) {
    return {
      ...point
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}

