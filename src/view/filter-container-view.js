import { createElement } from '../render.js';

function filterContainerTemplate() {
  return '<div class="trip-controls__filters"></div>';
}

export default class FilterContainerView {
  getTemplate() {
    return filterContainerTemplate();
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
