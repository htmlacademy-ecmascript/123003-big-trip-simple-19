import { createElement } from '../render.js';

function createPointFormTemplate() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class PointFormView {
  getTemplate() {
    return createPointFormTemplate();
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
