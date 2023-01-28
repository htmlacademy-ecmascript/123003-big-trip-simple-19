import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate({ type, isChecked = false, isDisabled = false }) {
  return (
    `<div class="trip-filters__filter">
      <input 
        id="filter-${ type }" 
        class="trip-filters__filter-input  visually-hidden"
        type="radio" 
        name="trip-filter" 
        value="${ type }" 
        ${ isChecked ? 'checked' : '' } 
        ${ isDisabled ? 'disabled' : '' }
      >
      <label class="trip-filters__filter-label" for="filter-${ type }">${ type }</label>
    </div>`
  );
}

function createTemplate(filterItems) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${ filterItems.map(createFilterTemplate).join('') }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #handleFilterTypeChange = null;
  #filterItems = null;

  constructor({ filterItems, onFilterTypeChange }) {
    super();

    this.#filterItems = filterItems;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#filterItems);
  }

  #filterTypeChangeHandler = (evt) => {
    this.#handleFilterTypeChange(evt.target.value);
  };
}
