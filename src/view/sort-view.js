import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate({ id, name, isChecked = false, isDisabled = true }) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${ id }">
    <input 
      id="sort-${ id }" 
      class="trip-sort__input  visually-hidden" 
      type="radio" 
      name="trip-sort" 
      value="${ id }" 
      ${ isChecked ? 'checked' : '' } 
      ${ isDisabled ? 'disabled' : '' }
    >
    <label class="trip-sort__btn" for="sort-${ id }">${ name }</label>
  </div>`
  );
}

function createTemplate(sortItems) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${ sortItems.map(createSortItemTemplate).join('') }
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortItems = null;

  constructor({ sortItems, onSortTypeChange }) {
    super();

    this.#sortItems = sortItems;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#sortItems);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.value);
  };
}
