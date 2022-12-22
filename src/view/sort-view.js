import { createElement } from '../render.js';

function createSortItemTemplate({ id, title, checked = false, disabled = false }) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${ id }">
    <input id="sort-${ id }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ id }" ${ checked ? 'checked' : '' } ${ disabled ? 'disabled' : '' }>
    <label class="trip-sort__btn" for="sort-${ id }">${ title }</label>
  </div>`
  );
}

function createTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemTemplate({ id: 'day', title: 'Day', checked: true })}
      ${createSortItemTemplate({ id: 'event', title: 'Event', disabled: true })}
      ${createSortItemTemplate({ id: 'time', title: 'Time', disabled: true })}
      ${createSortItemTemplate({ id: 'price', title: 'Price' })}
      ${createSortItemTemplate({ id: 'offer', title: 'Offers', disabled: true })}
    </form>`
  );
}

export default class SortView {
  #element = null;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
