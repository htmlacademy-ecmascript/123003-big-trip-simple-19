import { createElement } from '../render.js';

function mainContainerTemplate() {
  return '<section class="trip-events"></section>';
}

export default class MainContainerView {
  getTemplate() {
    return mainContainerTemplate();
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
