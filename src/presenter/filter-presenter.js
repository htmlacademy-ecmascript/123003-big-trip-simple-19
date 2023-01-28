import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType } from '../const.js';
import { hasFuturePoints, filterPoints } from '../utils/filter.js';

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
        type: FilterType.EVERYTHING,
        isChecked: true,
        isDisabled: points.length === 0,
      },
      {
        type: FilterType.FUTURE,
        isChecked: false,
        isDisabled: hasFuturePoints(points),
      },
    ];
  }

  #handleFilterTypeChange = () => {
    filterPoints(this.#pointsModel.points);
  };

  #renderFilter() {
    this.#filterView = new FilterView({
      filterItems: this.#getFilters(),
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    render(this.#filterView, this.#container);
  }
}
