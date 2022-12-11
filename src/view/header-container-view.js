import { createElement } from '../render.js';

function createTemplate() {
  return '<div class="trip-main"></div>';
}

export default class HeaderContainerView {
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
