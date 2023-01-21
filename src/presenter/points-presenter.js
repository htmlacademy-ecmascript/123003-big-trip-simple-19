import { render } from '../framework/render.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import SortPresenter from '../presenter/sort-presenter.js';
import PointPresenter from '../presenter/point-presenter.js';
import PointsListView from '../view/points-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import { TripMessageText } from '../const.js';
import { updateItem } from '../utils/points.js';

const pointsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

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
      this.#renderPoints();
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

  #renderSort() {
    const sortPresenter = new SortPresenter({
      container: pointsContainer,
      points: this.#points,
    });

    sortPresenter.init();
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      container: filterContainer,
      points: this.#points,
    });

    filterPresenter.init();
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    for (const point of this.#points) {
      this.#renderPoint(point);
    }

    render (this.#pointsListView, this.#container);
    this.#renderSort();
    this.#renderFilter();
  }

  #renderNoPoints() {
    render (new TripMessageView(TripMessageText.NO_POINTS), this.#container);
  }
}
