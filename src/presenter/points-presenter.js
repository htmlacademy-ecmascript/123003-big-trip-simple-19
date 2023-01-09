import { render } from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';
import TripMessageView from '../view/trip-message-view.js';
import { TripMessageText } from '../const.js';

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
      onRollupButtonClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointFormView = new PointFormView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        removeEscListener();
      },
      onRollupButtonClick: () => {
        replaceFormToPoint.call(this);
        removeEscListener();
      },
    });

    function removeEscListener() {
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    function replacePointToForm() {
      this.#pointsListView.element.replaceChild(pointFormView.element, pointView.element);
    }
    function replaceFormToPoint() {
      this.#pointsListView.element.replaceChild(pointView.element, pointFormView.element);
    }
    function escKeyDownHandler(evt) {
      if (evt.key.startsWith('Esc')) {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        removeEscListener();
      }
    }

    render(pointView, this.#pointsListView.element);
  }

  #renderPoints() {
    if (this.#points.length === 0) {
      return render (new TripMessageView(TripMessageText.NO_POINTS), this.#container);
    }

    for (const point of this.#points) {
      this.#renderPoint(point);
    }

    render (this.#pointsListView, this.#container);
  }
}
