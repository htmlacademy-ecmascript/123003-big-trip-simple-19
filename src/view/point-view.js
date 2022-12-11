import { createElement } from '../render.js';

function createTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class PointView {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
