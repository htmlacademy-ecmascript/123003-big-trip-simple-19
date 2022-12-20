import { createElement } from '../render.js';

function createTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class TripMessageView {
  element = null;
  #message = 'Click New Event to create your first point';

  constructor(message) {
    this.#message = message;
  }

  getTemplate() {
    return createTemplate(this.#message);
  }

  getElement() {
    if (this.element === null) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
