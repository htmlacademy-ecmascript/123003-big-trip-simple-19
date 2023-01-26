import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import PointsListView from '../view/points-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import SortView from '../view/sort-view.js';
import { TripMessageText } from '../const.js';
import { updateItem } from '../utils/points.js';
import { sortByTime, sortByPrice } from '../utils/points.js';
import { SortType } from '../const.js';

const sortItems = [
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
    name: 'offers',
  },
];

export default class PointsPresenter {
  #pointsListView = new PointsListView();
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();
  #sortView = null;

  constructor ({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    if (this.#points.length > 0){
      this.#renderSort();
      this.#renderPoints();

      render (this.#pointsListView, this.#container);
    } else {
      this.#renderNoPoints();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

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
  }

  #renderSort() {
    this.#sortView = new SortView({
      sortItems,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListView.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }

  #renderNoPoints() {
    render (new TripMessageView(TripMessageText.NO_POINTS), this.#container);
  }
}
