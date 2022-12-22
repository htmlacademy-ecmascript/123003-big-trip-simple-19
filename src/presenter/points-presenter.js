import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';
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

    for (const point of this.#points) {
      this.#renderPoint(point);
    }

    render (new SortView(), this.#container);
    render (this.#pointsListView, this.#container);
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
    const pointFormComponent = new PointFormView({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    const replacePointToForm = () => {
      this.#pointsListView.elementreplaceChild(pointComponent.element, pointFormComponent.element);
    };
    const replaceFormToPoint = () => {
      this.#pointsListView.elementreplaceChild(pointFormComponent.element, pointComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    pointFormComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointsListView.element);
  }
}
