import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import PointFormView from '../view/point-form-view.js';

export default class NewPointPresenter {
  #container = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #newPointView = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ destinations, offers }) {
    if (this.#newPointView !== null) {
      return;
    }

    this.#newPointView = new PointFormView({
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#handleResetClick,
      destinations,
      offers,
    });

    render(this.#newPointView, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointView === null) {
      return;
    }
    this.#handleDestroy();

    remove(this.#newPointView);
    this.#newPointView = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...point },
    );
    this.destroy();
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key?.startsWith('Esc')) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
