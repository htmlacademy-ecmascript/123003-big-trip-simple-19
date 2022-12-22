import { createElement } from '../render.js';

function createTemplate() {
  return '<section class="trip-events"></section>';
}

export default class MainContainerView {
  #element = null;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
