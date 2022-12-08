import { createElement } from '../render.js';

function createPointDetailsTemplate() {
  return '<section class="event__details"></section>';
}

export default class PointDetailsView {
  getTemplate() {
    return createPointDetailsTemplate();
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
