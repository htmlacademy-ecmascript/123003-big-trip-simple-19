import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { generateFilterItems } from '../utils/filter.js';

export default class FilterPresenter {
  #container = null;
  #points = null;

  constructor ({ container, points }) {
    this.#container = container;
    this.#points = points;
  }

  init() {
    render (new FilterView(generateFilterItems(this.#points)), this.#container);
  }
}
