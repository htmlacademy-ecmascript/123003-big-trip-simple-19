import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';

export default class SortPresenter {
  #container = null;
  #sortItems = null;

  constructor ({ container, sortItems }) {
    this.#container = container;
    this.#sortItems = sortItems;
  }

  init() {
    render (new SortView(this.#sortItems), this.#container, RenderPosition.AFTERBEGIN);
  }
}
