import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointFormView from '../view/point-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #destinations = null;
  #offers = null;
  #pointView = null;
  #pointFormView = null;
  #point = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, destinations, offers, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointView = this.#pointView;
    const prevPointFormView = this.#pointFormView;

    this.#pointView = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onRollupButtonClick: this.#handleRollDownClick,
    });

    this.#pointFormView = new PointFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleRollUpClick,
    });

    if (prevPointView === null || prevPointFormView === null) {
      render(this.#pointView, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointView, prevPointView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormView, prevPointFormView);
    }

    remove(prevPointView);
    remove(prevPointFormView);
  }

  destroy() {
    remove(this.#pointView);
    remove(this.#pointFormView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointFormView.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#pointFormView, this.#pointView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointView, this.#pointFormView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleRollDownClick = () => {
    this.#replacePointToForm();
  };

  #handleRollUpClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#replaceFormToPoint();
    this.#handleDataChange(point);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointFormView.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };
}
