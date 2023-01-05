import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate({ id, checked = false, disabled = false }) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${ id }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ id }" ${ checked ? 'checked' : '' } ${ disabled ? 'disabled' : '' }>
      <label class="trip-filters__filter-label" for="filter-${ id }">${ id }</label>
    </div>`
  );
}

function createTemplate() {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${createFilterTemplate({ id: 'everything', checked: true })}
      ${createFilterTemplate({ id: 'future' })}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
