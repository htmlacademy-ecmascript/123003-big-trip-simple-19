import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sortItem, isChecked = false, isDisabled = true) {
  const { name } = sortItem;
  if (name === 'day' || name === 'price') {
    isDisabled = false;
  }
  return (
    `<div class="trip-sort__item  trip-sort__item--${ name }">
    <input id="sort-${ name }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${ name }" ${ isChecked ? 'checked' : '' } ${ isDisabled ? 'disabled' : '' }>
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
  #sortItems = null;

  constructor(sortItems) {
    super();
    this.#sortItems = sortItems;
  }

  get template() {
    return createTemplate(this.#sortItems);
  }
}
