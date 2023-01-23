import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { capitalize } from '../utils/common.js';

function createSortItemTemplate(sortItem, isChecked = false, isDisabled = true) {
  const { name } = sortItem;
  if (name === 'day' || name === 'price') {
    isDisabled = false;
  }
  return (
    `<div class="trip-sort__item  trip-sort__item--${ name }">
    <input id="sort-${ name }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ name }" ${ isChecked ? 'checked' : '' } ${ isDisabled ? 'disabled' : '' } data-sort-type="${ SortType[capitalize(name)] }">
    <label class="trip-sort__btn" for="sort-${ name }">${ name === 'offer' ? 'offers' : name } </label>
  </div>`
  );
}

function createTemplate(sortItems) {

  const sortItemsTemplate = sortItems.map(
    (sortItem, index) => createSortItemTemplate(sortItem, index === 0)
  ).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${ sortItemsTemplate }
    </form>`
  );
}

export default class SortView extends AbstractView {
  #points = null;
  #handleSortTypeChange = null;

  constructor({ points, onSortTypeChange }) {
    super();
    this.#points = points;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#points);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
