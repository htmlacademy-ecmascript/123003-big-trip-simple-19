import { render, RenderPosition, remove } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import PointsListView from '../view/points-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import SortView from '../view/sort-view.js';
import { sortByTime, sortByPrice } from '../utils/points.js';
import { TripMessageText, SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filterPoints } from '../utils/filter.js';

const SORT_ITEMS = [
  {
    id: SortType.DAY,
    name: SortType.DAY,
    isChecked: true,
    isDisabled: false,
  },
  {
    id: SortType.EVENT,
    name:SortType.EVENT,
  },
  {
    id: SortType.TIME,
    name:SortType.TIME,
  },
  {
    id: SortType.PRICE,
    name:SortType.PRICE,
    isDisabled: false,
  },
  {
    id: SortType.OFFER,
    name: `${SortType.OFFER}s`,
  },
];

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #sortView = null;
  #pointsListView = new PointsListView();
  #tripMessageView = null;

  #newPointPresenter = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor ({ container, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointsListView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterPoints(points, this.#filterType);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return sortByTime(filteredPoints);
      case SortType.PRICE:
        return sortByPrice(filteredPoints);
    }
    return sortByTime(filteredPoints);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#render();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init({
      destinations: this.destinations,
      offers: this.offers,
    });
  }

  #renderSort() {
    this.#sortView = new SortView({
      sortItems: SORT_ITEMS.map(({ ...item }) => ({
        ...item,
        isChecked: item.id === this.#currentSortType,
      })),
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListView.element,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #render() {
    if (this.points.length > 0) {
      this.#renderSort();
      this.#renderPoints();

      render (this.#pointsListView, this.#container);
    } else {
      this.#renderNoPoints();
    }
  }

  #renderNoPoints() {
    this.#tripMessageView = new TripMessageView(TripMessageText[this.#filterType] ?? TripMessageText.NO_POINTS);
    render (this.#tripMessageView, this.#container);
  }

  #clear( { resetSortType = false } = {} ) {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortView);

    if (this.#tripMessageView) {
      remove(this.#tripMessageView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#render();
        break;
      case UpdateType.MAJOR:
        this.#clear({ resetSortType: true });
        this.#render();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clear();
    this.#render();
  };
}
