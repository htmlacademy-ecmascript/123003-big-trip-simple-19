import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';
import TripMessageView from '../view/trip-message-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { TripMessageText } from '../const.js';
import { render } from '../render.js';

export default class PointsPresenter {
  #pointsListView = new PointsListView();
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #destinations = [];
  #offers = [];

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

    this.#renderPoints();
  }

  #renderPoint(point) {
    const pointView = new PointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
    const pointFormView = new PointFormView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    function replacePointToForm() {
      this.#pointsListView.element.replaceChild(pointView.element, pointFormView.element);
    }
    function replaceFormToPoint() {
      this.#pointsListView.element.replaceChild(pointFormView.element, pointView.element);
    }

    const escKeyDownHandler = (evt) => {
      if (evt.key.startsWith('Esc')) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    if (pointView.element.querySelector('.event__rollup-btn') !== null) {
      pointView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      });
    }

    if (pointFormView.element.querySelector('.event__rollup-btn') !== null) {
      pointFormView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceFormToPoint();
      });
    }

    pointFormView.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointFormView, this.#pointsListView.element);
  }

  #renderPoints() {
    if (this.#points.length === 0) {
      return render (new TripMessageView(TripMessageText.NO_POINTS), this.#container);
    }

    for (const point of this.#points) {
      this.#renderPoint(point);
    }
    render (new NewEventButtonView(), document.querySelector('.trip-main'));
    render (new SortView(), this.#container);
    render (this.#pointsListView, this.#container);
  }
}
