import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType, UpdateType } from '../const.js';
import { hasFuturePoints } from '../utils/filter.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #filterView = null;


  constructor ({ container, pointsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
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
        isDisabled: !hasFuturePoints(points),
      },
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      filters,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterView === null) {
      render(this.#filterView, this.#container);
      return;
    }

    replace(this.#filterView, prevFilterView);
    remove(prevFilterView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
