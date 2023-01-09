import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #container = null;
  #filterItems = null;

  constructor ({ container, filterItems }) {
    this.#container = container;
    this.#filterItems = filterItems;
  }

  init() {
    render (new FilterView(this.#filterItems), this.#container);
  }
}
