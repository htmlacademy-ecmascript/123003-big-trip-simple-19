import { createElement } from '../render.js';

function createSortItemTemplate({ id, title, checked = '', disabled = '' }) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${id}">
    <input id="sort-${id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${id}" ${checked} ${disabled}>
    <label class="trip-sort__btn" for="sort-${id}">${title}</label>
  </div>`
  );
}

function createTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemTemplate({ id: 'day', title: 'Day', checked: 'checked' })}
      ${createSortItemTemplate({ id: 'event', title: 'Event', disabled: 'disabled' })}
      ${createSortItemTemplate({ id: 'time', title: 'Time', disabled: 'disabled' })}
      ${createSortItemTemplate({ id: 'price', title: 'Price' })}
      ${createSortItemTemplate({ id: 'offer', title: 'Offers', disabled: 'disabled' })}
    </form>`
  );
}

export default class SortView {
  getTemplate() {
    return createTemplate();
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
