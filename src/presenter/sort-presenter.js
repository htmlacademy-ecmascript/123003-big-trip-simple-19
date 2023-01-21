import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { generateSortItems } from '../utils/sort.js';

export default class SortPresenter {
  #container = null;
  #points = null;

  constructor ({ container, points }) {
    this.#container = container;
    this.#points = generateSortItems(points);
  }

  init() {
    render (new SortView(this.#points), this.#container, RenderPosition.AFTERBEGIN);
  }
}
