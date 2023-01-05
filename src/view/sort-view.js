import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate({ id, checked = false, disabled = false }) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${ id }">
    <input id="sort-${ id }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ id }" ${ checked ? 'checked' : '' } ${ disabled ? 'disabled' : '' }>
    <label class="trip-sort__btn" for="sort-${ id }">${ id === 'offer' ? 'offers' : id }</label>
  </div>`
  );
}

function createTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemTemplate({ id: 'day', checked: true })}
      ${createSortItemTemplate({ id: 'event', disabled: true })}
      ${createSortItemTemplate({ id: 'time', disabled: true })}
      ${createSortItemTemplate({ id: 'price' })}
      ${createSortItemTemplate({ id: 'offer', disabled: true })}
    </form>`
  );
}

export default class SortView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
