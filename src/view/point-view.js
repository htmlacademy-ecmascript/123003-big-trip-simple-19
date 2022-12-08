import { createElement } from '../render.js';

function createPointTemplate() {
  return ('<li class="trip-events__item"></li>'
  );
}

export default class PointView {
  getTemplate() {
    return createPointTemplate();
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
