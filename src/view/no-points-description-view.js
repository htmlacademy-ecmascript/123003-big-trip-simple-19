import { createElement } from '../render.js';

function createNoPointsDescriptionTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NoPointsDescriptionView {
  getTemplate() {
    return createNoPointsDescriptionTemplate();
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
