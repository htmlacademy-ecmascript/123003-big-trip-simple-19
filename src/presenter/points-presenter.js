import { render, RenderPosition, remove } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import PointsListView from '../view/points-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import SortView from '../view/sort-view.js';
import { sortByTime, sortByPrice } from '../utils/points.js';
import { TripMessageText, SortType, UpdateType, UserAction } from '../const.js';

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
  #pointsListView = new PointsListView();
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();
  #sortView = null;
  #tripMessageView = null;

  constructor ({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        sortByTime(this.#pointsModel.points);
        break;
      case SortType.PRICE:
        sortByPrice(this.#pointsModel.points);
        break;
      default:
        sortByTime(this.#pointsModel.points);
    }
  }

  init() {
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
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
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearBoard();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortView = new SortView({
      sortItems: SORT_ITEMS,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListView.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (const point of this.#pointsModel.points) {
      this.#renderPoint(point);
    }
  }

  #renderBoard() {
    if (this.#pointsModel.points.length > 0) {
      this.#renderSort();
      this.#renderPoints();

      render (this.#pointsListView, this.#container);
    } else {
      this.#renderNoPoints();
    }
  }

  #renderNoPoints() {
    this.#tripMessageView = new TripMessageView(TripMessageText.NO_POINTS);
    render (this.#tripMessageView, this.#container);
    remove(this.#sortView);
  }

  #clearBoard( { resetSortType = false } = {} ) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    // remove(this.#tripMessageView);

    if (resetSortType) {
      this.#sortPoints(SortType.DAY);
    }
  }
}
