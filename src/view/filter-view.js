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

function createTemplate(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${ filters.map(createFilterTemplate).join('') }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #handleFilterTypeChange = null;
  #filters = null;

  constructor({ filters, onFilterTypeChange }) {
    super();

    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTemplate(this.#filters);
  }

  #filterTypeChangeHandler = (evt) => {
    this.#handleFilterTypeChange(evt.target.value);
  };
}
