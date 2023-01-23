import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { generateSortItems } from '../utils/sort.js';
import { sortByTime, sortByPrice } from '../utils/points.js';
import { SortType } from '../const.js';

export default class SortPresenter {
  #container = null;
  #points = null;
  #sortView = null;
  #currentSortType = SortType.DAY;

  constructor ({ container, points, onSortTypeChange }) {
    this.#container = container;
    this.#points = points;
    this.#handleSortTypeChange = onSortTypeChange;
  }

  init() {
    this.#sortView = new SortView({
      points: generateSortItems(this.#points),
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render (this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        sortByTime(this.#points);
        break;
      case SortType.PRICE:
        sortByPrice(this.#points);
        break;
      default:
        sortByTime(this.#points);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
  };
}
