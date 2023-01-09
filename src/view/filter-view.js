import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate( filterItem, isChecked = false, isDisabled = false ) {
  const { name, count } = filterItem;
  if(count === 0){
    isDisabled = true;
  }
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${ name }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ name }" ${ isChecked ? 'checked' : '' } ${ isDisabled ? 'disabled' : '' }>
      <label class="trip-filters__filter-label" for="filter-${ name }">${ name }</label>
    </div>`
  );
}

function createTemplate(filterItems) {
  const filterItemsTemplate = filterItems.map((filterItem, index) => createFilterTemplate(filterItem, index === 0)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${ filterItemsTemplate }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filterItems = null;

  constructor(filterItems) {
    super();
    this.#filterItems = filterItems;
  }

  get template() {
    return createTemplate(this.#filterItems);
  }
}
