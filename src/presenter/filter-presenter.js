import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType } from '../const.js';
import { hasFuturePoints, filterPointsByFuture } from '../utils/filter.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterView = null;

  constructor ({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#renderFilter();
  }

  #getFilters() {
    const points = this.#pointsModel.points;

    return [
      {
        id: 'everything',
        type: FilterType.EVERYTHING,
        isChecked: true,
        isDisabled: points.length === 0,
      },
      {
        id: 'future',
        type: FilterType.FUTURE,
        isChecked: false,
        isDisabled: hasFuturePoints(points),
      },
    ];
  }

  #handleFilterTypeChange = (filterType) => {
    this.#filterPoints(filterType);
  };

  #filterPoints(filterType) {
    switch (filterType) {
      case FilterType.FUTURE:
        filterPointsByFuture(this.#pointsModel.points);
        break;
      case FilterType.EVERYTHING:
        this.#pointsModel.points.slice();
        break;
      default:
        this.#pointsModel.points.slice();
    }
  }

  #renderFilter() {
    this.#filterView = new FilterView({
      filterItems: this.#getFilters(),
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    render(this.#filterView, this.#container);
  }
}
